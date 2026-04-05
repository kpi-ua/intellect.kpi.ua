import React from 'react';
import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Exo_2 } from 'next/font/google';
import 'feather-icons/dist/feather';
import './global.css';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import Footer from '@/components/Footer/Footer';
import bottomLogo from '@/assets/svg/kpi-logo.svg';

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

interface LocaleProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'global.metadata' });

    return {
        metadataBase: new URL('https://intellect.kpi.ua'),
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        authors: [{ name: t('author') }],
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
            title: t('title'),
            type: 'website',
            description: t('description'),
            images: [
                {
                    url: 'https://cdn.cloud.kpi.ua/public/intellect/intellect-preview.jpeg',
                },
            ],
        },
        other: {
            'apple-mobile-web-app-title': 'Інтелект',
            'google-site-verification': 'nKBb5HaloCCDLnQuj3Hhbv3cWMG3JzZoygGD1chvtrk',
            'fb:app_id': '1214335051921931',
        },
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <html lang={locale} className={exo2.className}>
            <head>
                <meta charSet="utf-8" />
            </head>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <main className="main-layout-wrapper">{children}</main>
                    <Footer logoSrc={bottomLogo} />

                    {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
