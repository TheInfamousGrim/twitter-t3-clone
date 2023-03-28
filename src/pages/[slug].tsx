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
import { api, type RouterOutputs } from '~/utils/api';

// SSG Helper
import { generateSSGHelper } from '~/server/helpers/ssgHelper';

// Cloud image
import { CldImage } from 'next-cloudinary';

// Components
import { AuthFooter } from '~/components/AuthFooter';
import { LoadingPage, LoadingSpinner } from '~/components/LoadingSpinner';
import { SideNavigation } from '~/components/SideNavigation';
import { NewToTwooter } from '~/components/NewToTwooter';
import { PageLayout } from '~/components/PageLayout';

// Icons
import { CalendarDaysIcon } from '@heroicons/react/20/solid';

const Profile: NextPage<{ username: string }> = ({ username }) => {
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data || !data.username || !data.profileImageUrl) return <div>404</div>;

  // Return an empty div if there is no user
  if (!userLoaded) return <div />;
  console.log(dayjs(data.createdAt));

  if (!user || !user.username) return <div>No user loaded</div>;

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
          <h2 className="sr-only">Twooter Feed</h2>
          <article className="w-full border-b border-zinc-800" role="article">
            <h2 className="sr-only">{`${username}'s profile information`}</h2>
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
                {data.id === user.id && (
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