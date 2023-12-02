import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';

import 'feather-icons/dist/feather';
import '../styles/global.css';
import Layout from './layout';
import { NextPage } from 'next';

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

// This default export is required in a new `pages/_app.js` file.
export default function Intellect({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

    return getLayout(<Component {...pageProps} />);
}
