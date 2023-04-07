import { type NextPage } from 'next';
// Dependencies
import Head from 'next/head';
import { useUser } from '@clerk/nextjs';

// Components
import { AuthFooter } from '~/components/AuthFooter';
import { NewToTwooter } from '~/components/NewToTwooter';
import { PageLayout } from '~/components/PageLayout';
import { SideNavigation } from '~/components/SideNavigation';
import { Feed } from '~/components/TweetFeed';

import { ContactFooter } from '~/components/ContactFooter';
import { EndOfFeed } from '~/components/EndOfFeed';

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
