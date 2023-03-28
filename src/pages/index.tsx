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
import { PageLayout } from '~/components/PageLayout';
import { SideNavigation } from '~/components/SideNavigation';
import { NewToTwooter } from '~/components/NewToTwooter';

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

//Types
type TweetWithUser = RouterOutputs['tweet']['getAll'][number];

/* --------------------------- Tweet Timeline View -------------------------- */
const TweetView = (props: TweetWithUser) => {
  const { tweet, author } = props;
  const formattedDate = dayjs(tweet.createdAt).format('MMM D YYYY HH:mm');

  if (!author || !author.profileImageUrl || !author.username) {
    return (
      <div>
        <p>{`Couldn't load tweet`}</p>
      </div>
    );
  }
  return (
    <>
      <div className="hidden hover:bg-sky-500 hover:bg-green-500 hover:bg-bright-pink hover:text-sky-500 hover:text-bright-pink hover:text-green-500"></div>
      <article
        key={tweet.id}
        className="border-b border-zinc-800"
        role="article"
      >
        <Link
          href={`/twoot/${tweet.id}`}
          className="flex gap-4 p-4 hover:bg-gray-50 hover:bg-opacity-5"
        >
          <div className="h-[40px] w-[40px]">
            <Link href={`/@${author.username}`}>
              <Image
                src={author.profileImageUrl}
                width={100}
                height={100}
                className="rounded-full duration-150 ease-in hover:cursor-pointer hover:bg-gray-50 hover:bg-opacity-10"
                alt={`@${author?.username}'s profile picture`}
              />
            </Link>
          </div>
          <div className="w-full">
            <div className="flex gap-2">
              <Link href={`/@${author.username}`} className="">
                <address className="font-bold not-italic text-gray-50 hover:underline hover:decoration-2">
                  {author?.username}
                </address>
              </Link>
              <time
                dateTime={`${formattedDate}`}
                className="text-zinc-400"
              >{`· ${formattedDate}`}</time>
            </div>
            <div className="mt-1">{tweet.text}</div>
            <div className="mt-1 flex justify-between">
              {tweetButtonData.map((buttonData, index) => {
                return (
                  <button
                    key={`${buttonData.name}-${index}`}
                    className={`tooltip tooltip-bottom z-10 rounded-full p-2 duration-150 hover:text-${buttonData.hoverColor} ease-in hover:bg-${buttonData.hoverColor} hover:bg-opacity-10`}
                    data-tip={buttonData.name}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('clicked');
                    }}
                  >
                    <buttonData.icon
                      className={`h-5 w-5 text-zinc-400 duration-150 ease-in hover:text-${buttonData.hoverColor}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </Link>
      </article>
    </>
  );
};

const Feed = () => {
  const { data, isLoading: tweetsLoading } = api.tweet.getAll.useQuery();

  if (tweetsLoading) {
    return (
      <div className="mt-4 flex h-screen items-center justify-center">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (!data) return <div>Something went wrong</div>;

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
