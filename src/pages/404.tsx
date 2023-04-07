// Dependencies
import Head from 'next/head';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

// Components
import { AuthFooter } from '~/components/AuthFooter';
import { SideNavigation } from '~/components/SideNavigation';
import { NewToTwooter } from '~/components/NewToTwooter';
import { PageLayout } from '~/components/PageLayout';

export default function Custom404() {
  const { isSignedIn } = useUser();

  return (
    <>
      <Head>
        <title>{`Twooter | 404`}</title>
        <meta
          name="description"
          content="A delightful twitter clone made using the awesome t3 stack"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full justify-center">
        <SideNavigation />
        <PageLayout>
          <div className="flex h-screen flex-col items-center justify-center gap-6 p-6 text-center">
            <h3>{`Hmmm... this page doesn't exist in this dimension. Try heading back to the comfort of home.`}</h3>
            <Link
              href="/"
              className="rounded-full bg-bright-pink py-2.5 px-3.5 text-base font-bold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-pink"
            >
              Home
            </Link>
          </div>
        </PageLayout>
        {!isSignedIn && <NewToTwooter />}
      </div>
      {!isSignedIn && <AuthFooter />}
    </>
  );
}
