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

// Cloud image
import { CldImage } from 'next-cloudinary';

// Components
import { AuthFooter } from '~/components/AuthFooter';
import { LoadingPage, LoadingSpinner } from '~/components/LoadingSpinner';
import { SideNavigation } from '~/components/SideNavigation';
import { NewToTwooter } from '~/components/NewToTwooter';

const Profile: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();

  // Return an empty div if there is no user
  if (!userLoaded) return <div />;

  if (!user || !user.username) return <div>No user loaded</div>;
  console.log(user);

  return (
    <>
      <Head>
        <title>{`Twooter | @${user.username}`}</title>
        <meta
          name="description"
          content={`@${user.username} twooter profile page`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full justify-center">
        <SideNavigation />
        <main className="my-auto ml-20 flex min-h-[24960px] grow overscroll-none sm:ml-0 md:grow-0">
          <section className="w-full max-w-[600px] border-x border-zinc-800 md:w-[600px]">
            <h2 className="sr-only">Twooter Feed</h2>
            <article className="w-full">
              <div className="h">
                <CldImage
                  src="https://res.cloudinary.com/dmh1rwpa1/image/upload/v1679966852/Twooter/Profiles/pixel-jeff-clipa_ya0e9u.gif"
                  width={1080}
                  height={260}
                  alt="Users profile banner"
                  className="max-h-52"
                />
                <div className="relative -mt-16 ml-4 max-w-[100px]">
                  <Image
                    src={user?.profileImageUrl}
                    width={100}
                    height={100}
                    alt={`${user?.username} profile picture`}
                    className="absolute inset-0 w-full rounded-full border-4 border-black"
                  />
                </div>
              </div>
            </article>
          </section>
          {!isSignedIn && <NewToTwooter />}
        </main>
      </div>
      {!isSignedIn && <AuthFooter />}
    </>
  );
};

export default Profile;
