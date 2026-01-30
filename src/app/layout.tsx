import React from 'react';
import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import 'feather-icons/dist/feather';
import './global.css';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#1f4d80',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#1f4d80',
};

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
        <html lang="uk">
            <head>
                <meta charSet="utf-8" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                    integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </head>
            <body>
                <main className="main-layout-wrapper">{children}</main>
                {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
            </body>
        </html>
    );
}
