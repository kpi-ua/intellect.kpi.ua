import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ISearchBlock from '@/components/I-SearchBlock/I-SearchBlock';
import bottomLogo from '@/assets/svg/kpi-logo.svg';
import { setRequestLocale } from 'next-intl/server';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <div className="text-white header-wrapper">
                <Header underlined={false} scheme="light" />
                <div className="wrapper">
                    <ISearchBlock />
                </div>
            </div>
            <div className="wrapper">
                <div className="mt-16 min-h-20"></div>
            </div>
            <Footer logoSrc={bottomLogo} />
        </>
    );
}
