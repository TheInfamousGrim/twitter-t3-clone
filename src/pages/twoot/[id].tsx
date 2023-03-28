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
import { LoadingPage, LoadingSpinner } from '~/components/LoadingSpinner';
import { SideNavigation } from '~/components/SideNavigation';
import { NewToTwooter } from '~/components/NewToTwooter';
import { PageLayout } from '~/components/PageLayout';
import { TweetView } from '~/components/TweetView';

const Twoot: NextPage<{ id: string }> = ({ id }) => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  const { data } = api.tweet.getById.useQuery({
    id,
  });
  if (!data) return <div>404</div>;

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
          <TweetView {...data} />
        </PageLayout>
        {!isSignedIn && <NewToTwooter />}
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
