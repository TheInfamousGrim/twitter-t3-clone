// Dependencies
import Link from 'next/link';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/router';

// Dayjs
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocal from 'dayjs/plugin/updateLocale';
dayjs.extend(customParseFormat);
dayjs.extend(updateLocal);
dayjs.extend(relativeTime);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1m',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1M',
    MM: '%dM',
    y: '1y',
    yy: '%dy',
  },
});

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

// API
import { api, type RouterOutputs, type RouterInputs } from '~/utils/api';
import { MouseEventHandler } from 'react';

//Types
type TweetWithUser = {
  tweetData: RouterOutputs['tweet']['getAll']['tweetsWithUsers'][number];
  input: RouterInputs['tweet']['getAll'];
};

export const TweetView = (props: TweetWithUser) => {
  const { tweet } = props.tweetData;
  const { author } = props.tweetData;
  const formattedDate = dayjs(tweet.createdAt).format('MMM-D-YYYY HH:mm');

  // Router
  const router = useRouter();

  // Handle user link
  const handleUserRoute = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!author || !author.username) {
      return router.push('/404');
    }

    await router.push(`/@${author.username}`);
  };

  if (!author || !author.profileImageUrl || !author.username) {
    return (
      <div className="border-b border-zinc-800">
        <div className="flex w-full items-center justify-center p-4">
          <p>{`Couldn't load tweet`}</p>
        </div>
      </div>
    );
  }

  // Sanitize tweet
  const cleanTweet = DOMPurify.sanitize(tweet.text);

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
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleUserRoute(e)
              }
            >
              <Image
                src={author.profileImageUrl}
                width={100}
                height={100}
                className="rounded-full duration-150 ease-in hover:cursor-pointer hover:bg-gray-50 hover:bg-opacity-10"
                alt={`@${author?.username}'s profile picture`}
              />
            </button>
          </div>
          <div className="w-full">
            <div className="flex gap-2">
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  handleUserRoute(e)
                }
                className=""
              >
                <address className="font-bold not-italic text-gray-50 hover:underline hover:decoration-2">
                  {author?.username}
                </address>
              </button>
              <time
                dateTime={`${formattedDate}`}
                className="text-zinc-400"
              >{`· ${dayjs(tweet.createdAt).fromNow()}`}</time>
            </div>
            <div
              className="mt-1 [&>p]:leading-tight"
              dangerouslySetInnerHTML={{ __html: cleanTweet }}
            />
            <div className="mt-1 flex justify-between">
              {tweetButtonData.map((buttonData, index) => {
                return (
                  <button
                    key={`${buttonData.name}-${index}`}
                    className={`tooltip tooltip-bottom z-10 rounded-full p-2 duration-150 hover:text-${buttonData.hoverColor} ease-in hover:bg-${buttonData.hoverColor} hover:bg-opacity-10`}
                    data-tip={buttonData.name}
                    onClick={(e) => {
                      e.preventDefault();
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
