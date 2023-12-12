import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import 'feather-icons/dist/feather';

import '../styles/global.css';

import Layout from './layout';

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
                <meta charSet="utf-8" />
                <title key="title">Інтелект | Викладачі та науковці</title>

                <link rel="shortcut icon" type="image/vnd.microsoft.icon" href='/favicon.ico' />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                <link
                    rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                    integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
                    crossOrigin="anonymous" referrerPolicy="no-referrer" />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                />
                <meta
                    key="description"
                    name="description"
                    content="Проект об′єднує вчених, викладачів, інженерів та аспірантів університету, які займаються інтелектуальною творчою діяльністю, проводять фундаментальні та прикладні наукові дослідження, впроваджують отримані результати в виробництво, займаються навчальною, методичною і організаційною роботою."
                />
                <meta
                    name="keywords"
                    content="система Інтелект, НТУУ КПІ, Київський політехнічний інститут, викладачі КПІ, Intellect"
                />
                <meta name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
                <meta name="theme-color" content="#0277bd" />

                <meta key="og:title" property="og:title" content="Інтелект | КПІ ім. Ігоря Сікорського" />
                <meta key="og:type" property="og:type" content="website" />
                <meta key="og:image" property="og:image"
                    content="https://do4rt9wur3t6m.cloudfront.net/intellect/intellect-preview.jpeg" />

                <meta
                    key="og:description"
                    property="og:description"
                    content="Проект об′єднує вчених, викладачів, інженерів та аспірантів університету, які займаються інтелектуальною творчою діяльністю, проводять фундаментальні та прикладні наукові дослідження, впроваджують отримані результати в виробництво, займаються навчальною, методичною і організаційною роботою."
                />
                <meta property="fb:app_id" content="1214335051921931" />
            </Head>
            <main>{getLayout(<Component {...pageProps} />)}</main>
        </>
    );
}
