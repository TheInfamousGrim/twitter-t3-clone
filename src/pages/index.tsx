import { type NextPage } from 'next';
// Dependencies
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useUser, SignOutButton } from '@clerk/nextjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

// API
import { api, type RouterOutputs } from '~/utils/api';

// Components
import { AuthFooter } from '~/components/AuthFooter';
import { LoadingPage, LoadingSpinner } from '~/components/LoadingSpinner';
import { NewToTwooter } from '~/components/NewToTwooter';
import { PageLayout } from '~/components/PageLayout';
import { SideNavigation } from '~/components/SideNavigation';
import { TweetView } from '~/components/TweetView';

// Icons
import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';

// Tweet Button Data
const tweetButtonData = [
  {
    name: 'Reply',
    icon: ChatBubbleOvalLeftIcon,
    hoverColor: 'sky-500',
  },
  {
    name: 'Retweet',
    icon: ArrowPathRoundedSquareIcon,
    hoverColor: 'green-500',
  },
  {
    name: 'Like',
    icon: HeartIcon,
    hoverColor: 'bright-pink',
  },
  {
    name: 'View',
    icon: ChartBarIcon,
    hoverColor: 'sky-500',
  },
  {
    name: 'Share',
    icon: ArrowUpTrayIcon,
    hoverColor: 'sky-500',
  },
];

const Feed = () => {
  const { data, isLoading: tweetsLoading } = api.tweet.getAll.useQuery();

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
    <div className="min-h-[24960px]">
      {[...data]?.map((fullTweet) => (
        <TweetView {...fullTweet} key={fullTweet.tweet.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Return an empty div if there is no user
  if (!userLoaded) return <div />;
  console.log(isSignedIn);

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
        </PageLayout>
        {!isSignedIn && <NewToTwooter />}
      </div>
      {!isSignedIn && <AuthFooter />}
    </>
  );
};

export default Home;
