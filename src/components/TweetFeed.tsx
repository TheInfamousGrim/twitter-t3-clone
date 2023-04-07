'use client';

// Dependencies
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// API
import { api } from '~/utils/api';

// Components
import { LoadingSpinner } from '~/components/LoadingSpinner';
import { TweetView } from '~/components/TweetView';

// Feed Limit
const LIMIT = 10;

export const Feed = () => {
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
  const { ref, inView } = useInView({ threshold: 0 });

  const tweets = data?.pages.flatMap((page) => page.tweetsWithUsers) ?? [];

  useEffect(() => {
    const nextTweetPage = async () => {
      // Get the next page of data if the intersection comes into view
      if (inView && hasNextPage && !isFetching) {
        await fetchNextPage();
      }
    };
    nextTweetPage().catch((e) => console.log(e));
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

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
    <>
      <div className="h-full">
        {tweets.map((fullTweet) => (
          <TweetView
            tweetData={{ ...fullTweet }}
            key={fullTweet.tweet.id}
            input={{ limit: LIMIT }}
          />
        ))}
      </div>
      <div ref={ref}></div>
      {isFetching && (
        <div className="flex h-auto w-full items-center justify-center p-4">
          <LoadingSpinner size={40} />
        </div>
      )}
    </>
  );
};
