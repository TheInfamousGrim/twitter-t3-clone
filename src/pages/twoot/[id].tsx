// Dependencies
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useUser, SignOutButton } from '@clerk/nextjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

// Types
import type { GetStaticProps, NextPage } from 'next';

// Helpers
import { generateSSGHelper } from '~/server/helpers/ssgHelper';

// API
import { api, type RouterOutputs } from '~/utils/api';

// Components
import { AuthFooter } from '~/components/AuthFooter';
import { Custom404Component } from '~/components/Error404';
import { LoadingPage, LoadingSpinner } from '~/components/LoadingSpinner';
import { SideNavigation } from '~/components/SideNavigation';
import { NewToTwooter } from '~/components/NewToTwooter';
import { PageLayout } from '~/components/PageLayout';
import { TweetView } from '~/components/TweetView';
import { ContactFooter } from '~/components/ContactFooter';

const Twoot: NextPage<{ id: string }> = ({ id }) => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  const { data } = api.tweet.getById.useQuery({
    id,
  });
  if (!data) {
    return <Custom404Component />;
  }

  return (
    <>
      <Head>
        <title>{`Twooter | Twoot - ${data.tweet.id}`}</title>
        <meta
          name="description"
          content="A delightful twitter clone made using the awesome t3 stack"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full justify-center">
        <SideNavigation />
        <PageLayout>
          <TweetView tweetData={{ ...data }} input={{ limit: 10 }} />
          <div className="h-screen p-4 font-bold text-gray-50">
            <h3>Look at all the space</h3>
          </div>
        </PageLayout>
        {!isSignedIn && <NewToTwooter />}
        {isSignedIn && <ContactFooter />}
      </div>
      {!isSignedIn && <AuthFooter />}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== 'string') throw new Error('no id');

  await ssg.tweet.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' };
};

export default Twoot;
