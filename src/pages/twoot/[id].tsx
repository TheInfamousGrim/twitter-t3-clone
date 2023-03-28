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
import { SideNavigation } from '~/components/SideNavigation';
import { NewToTwooter } from '~/components/NewToTwooter';
import { PageLayout } from '~/components/PageLayout';

const Twoot: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Return an empty div if there is no user
  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>Twooter | Twoot</title>
        <meta
          name="description"
          content="A delightful twitter clone made using the awesome t3 stack"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full justify-center">
        <SideNavigation />
        <PageLayout>
          <h2 className="sr-only">Twooter Feed</h2>
          <div>Twoot view</div>
        </PageLayout>
        {!isSignedIn && <NewToTwooter />}
      </div>
      {!isSignedIn && <AuthFooter />}
    </>
  );
};

export default Twoot;
