import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';

import 'feather-icons/dist/feather';
import '../styles/global.css';
import Layout from './layout';
import { NextPage } from 'next';

import Head from 'next/head';

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

// This default export is required in a new `pages/_app.js` file.
export default function Intellect({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

    return (
        <>
            <Head>
                <title>Intellect</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <main>{getLayout(<Component {...pageProps} />)};</main>
        </>
    );
}
