import React from 'react';
import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Exo_2 } from 'next/font/google';
import 'feather-icons/dist/feather';
import './global.css';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#1f4d80',
};

const exo2 = Exo_2({
    subsets: ['cyrillic', 'latin'],
    display: 'swap',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://intellect.kpi.ua'),
    title: 'Інтелект | Викладачі та науковці',
    description:
        'Проект об′єднує вчених, викладачів, інженерів та аспірантів університету, які займаються інтелектуальною творчою діяльністю, проводять фундаментальні та прикладні наукові дослідження, впроваджують отримані результати в виробництво, займаються навчальною, методичною і організаційною роботою.',
    keywords: 'система Інтелект, НТУУ КПІ, Київський політехнічний інститут, викладачі КПІ, Intellect',
    authors: [{ name: 'НТУУ КПІ ім. Ігоря Сікорського' }],
    icons: {
        icon: [
            { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon.ico', type: 'image/x-icon' },
        ],
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: '/site.webmanifest',
    openGraph: {
        title: 'Інтелект | КПІ ім. Ігоря Сікорського',
        type: 'website',
        description:
            'Проект об′єднує вчених, викладачів, інженерів та аспірантів університету, які займаються інтелектуальною творчою діяльністю, проводять фундаментальні та прикладні наукові дослідження, впроваджують отримані результати в виробництво, займаються навчальною, методичною і організаційною роботою.',
        images: [
            {
                url: 'https://do4rt9wur3t6m.cloudfront.net/intellect/intellect-preview.jpeg',
            },
        ],
    },
    other: {
        'apple-mobile-web-app-title': 'Інтелект',
        'google-site-verification': 'nKBb5HaloCCDLnQuj3Hhbv3cWMG3JzZoygGD1chvtrk',
        'fb:app_id': '1214335051921931',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="uk" className={exo2.className}>
            <head>
                <meta charSet="utf-8" />
            </head>
            <body>
                <main className="main-layout-wrapper">{children}</main>
                {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
            </body>
        </html>
    );
}
