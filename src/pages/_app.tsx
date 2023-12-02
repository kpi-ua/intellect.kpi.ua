import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';

import 'feather-icons/dist/feather';
import '../styles/global.css';

// This default export is required in a new `pages/_app.js` file.
export default function Intellect({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
