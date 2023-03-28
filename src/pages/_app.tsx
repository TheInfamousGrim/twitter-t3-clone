// Dependencies
import { ClerkProvider } from '@clerk/nextjs';
import { type AppType } from 'next/app';

// tRPC API
import { api } from '~/utils/api';

// Components
import { Toaster } from 'react-hot-toast';

import '~/styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Toaster />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
