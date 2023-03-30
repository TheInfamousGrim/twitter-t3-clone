import { type NextPage } from 'next';
// Dependencies
import Head from 'next/head';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

// API
import { api, type RouterInputs, type RouterOutputs } from '~/utils/api';

// Components
import { AuthFooter } from '~/components/AuthFooter';
import { LoadingSpinner } from '~/components/LoadingSpinner';
import { NewToTwooter } from '~/components/NewToTwooter';
import { PageLayout } from '~/components/PageLayout';
import { SideNavigation } from '~/components/SideNavigation';
import { TweetView } from '~/components/TweetView';

import { ContactFooter } from '~/components/ContactFooter';
import { EndOfFeed } from '~/components/EndOfFeed';

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const scrolled = (winScroll / height) * 100;
    setScrollPosition(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  console.log(scrollPosition);

  return scrollPosition;
}

// Feed Limit
const LIMIT = 10;

const Feed = () => {
  const {
    data,
    isLoading: tweetsLoading,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = api.tweet.getAll.useInfiniteQuery(
    {
      limit: LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const scrollPosition = useScrollPosition();
  console.log({ scrollPosition });

  const tweets = data?.pages.flatMap((page) => page.tweetsWithUsers) ?? [];

  // useEffect(() => {
  //   console.log('running');
  //   if (scrollPosition > 90 && hasNextPage && !isFetching) {
  //     fetchNextPage();
  //   }
  // }, [scrollPosition, hasNextPage, isFetching, fetchNextPage]);

  if (tweetsLoading) {
    return (
      <div className="mt-4 flex h-screen items-center justify-center">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-6 text-center">
        <h3>{`Hmmm... Something went wrong getting these twoots, try refreshing?`}</h3>
        <Link
          href="/"
          className="rounded-full bg-bright-pink py-2.5 px-3.5 text-base font-bold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-pink"
        >
          Home
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full">
      {tweets.map((fullTweet) => (
        <TweetView
          tweetData={{ ...fullTweet }}
          key={fullTweet.tweet.id}
          input={{ limit: LIMIT }}
        />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Return an empty div if there is no user
  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>Twooter | Home</title>
        <meta
          name="description"
          content="A delightful twitter clone made using the awesome t3 stack"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center">
        <SideNavigation />
        <PageLayout>
          <h2 className="sr-only">Twooter Feed</h2>
          <Feed />
          <EndOfFeed />
        </PageLayout>
        {!isSignedIn && <NewToTwooter />}
      </div>
      {isSignedIn && (
        <div className="relative">
          <ContactFooter />
        </div>
      )}
      {!isSignedIn && <AuthFooter />}
    </>
  );
};

export default Home;
