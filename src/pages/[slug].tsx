import { InferGetStaticPropsType, type NextPage } from 'next';
// Dependencies
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

// Types
import type { GetStaticProps } from 'next';

// API
import { api } from '~/utils/api';

// SSG Helper
import { generateSSGHelper } from '~/server/helpers/ssgHelper';

// Cloud image
import { CldImage } from 'next-cloudinary';

// Components
import { AuthFooter } from '~/components/AuthFooter';
import { LoadingSpinner } from '~/components/LoadingSpinner';
import { NewToTwooter } from '~/components/NewToTwooter';
import { PageLayout } from '~/components/PageLayout';
import { SideNavigation } from '~/components/SideNavigation';
import { TweetView } from '~/components/TweetView';

// Icons
import { CalendarDaysIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.tweet.getPostByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading) {
    return (
      <div className="flex items-start justify-center pt-4">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-6 text-center">
        <h3>{`Hmmm... These twoots don't seem to exist. Try heading back to the comfort of home or maybe reloading.`}</h3>
        <Link
          href="/"
          className="rounded-full bg-bright-pink py-2.5 px-3.5 text-base font-bold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-pink"
        >
          Home
        </Link>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-6 text-center">
        <p>Looks like this user has not twooted yet</p>
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

const Profile: NextPage<{ username: string }> = ({ username }) => {
  const { isSignedIn, user } = useUser();
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data || !data.username || !data.profileImageUrl) return <div>404</div>;

  // Handling the user id
  let userPlaceholder;
  if (!user || !user.id) {
    userPlaceholder = {
      id: null,
    };
  } else {
    userPlaceholder = {
      id: user.id,
    };
  }
  console.log(data);

  return (
    <>
      <Head>
        <title>{`Twooter | @${data.username}`}</title>
        <meta
          name="description"
          content={`@${data.username} twooter profile page`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full justify-center">
        <SideNavigation />
        <PageLayout>
          <div className="sticky inset-0 z-20 bg-[#00000033] backdrop-blur-sm">
            <div className="flex items-center justify-start gap-4 px-4 py-2">
              <Link
                href="/"
                className="tooltip tooltip-bottom rounded-full p-2 duration-150 ease-in hover:bg-gray-50 hover:bg-opacity-10"
                data-tip="Back"
              >
                <ArrowLeftIcon className="h-6 w-6 text-zinc-200" />
              </Link>
              <div className="">
                <h3 className="t text-lg font-bold">{data.username}</h3>
                <p></p>
              </div>
            </div>
          </div>
          <h1 className="sr-only">Twooter Feed</h1>
          <article
            className="relative w-full border-b border-zinc-800"
            role="article"
          >
            <h2 className="sr-only">{`${data.username}'s profile information`}</h2>
            <div className="h-52 w-full">
              <CldImage
                src="https://res.cloudinary.com/dmh1rwpa1/image/upload/v1679966852/Twooter/Profiles/pixel-jeff-clipa_ya0e9u.gif"
                width={1080}
                height={360}
                alt="Users profile banner"
                className="max-h-52"
              />
              <div className="relative -mt-16 ml-4 max-w-[100px]">
                <Image
                  src={data.profileImageUrl}
                  width={100}
                  height={100}
                  alt={`${data.username} profile picture`}
                  className="absolute inset-0 w-full rounded-full border-4 border-black"
                  placeholder="empty"
                />
              </div>
            </div>
            <div className="mt-2 mb-4 w-full px-4 pt-3">
              <div className="flex items-start justify-end">
                {data.id === userPlaceholder.id && (
                  <button
                    type="button"
                    className="rounded-full border border-bright-pink bg-transparent py-1.5 px-3.5 text-base font-bold text-white shadow-sm duration-150 ease-in hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-pink"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
              <div className="mt-2">
                <h2 className="text-2xl font-bold not-italic">{`${username}`}</h2>
                <address className="not-italic text-zinc-500">{`@${username}`}</address>
              </div>
              <div className="mt-2 flex gap-2">
                <CalendarDaysIcon className="h-6 w-6 text-zinc-500" />
                <p className="font-medium text-zinc-500">{`Joined ${dayjs(
                  data.createdAt
                ).format('MMMM YYYY')}`}</p>
              </div>
            </div>
            {isLoading && <LoadingSpinner size={60} />}
          </article>
          <section>
            <ProfileFeed userId={data.id} />
          </section>
        </PageLayout>
        {!isSignedIn && <NewToTwooter />}
      </div>
      {!isSignedIn && <AuthFooter />}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const slug = context.params?.slug;

  if (typeof slug !== 'string') throw new Error('no slug');

  const username = slug.replace('@', '');

  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' };
};

export default Profile;
