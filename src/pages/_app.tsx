import type { AppProps } from 'next/app';
import React from 'react';
import '../styles.css';

// This default export is required in a new `pages/_app.js` file.
export default function Intellect({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
