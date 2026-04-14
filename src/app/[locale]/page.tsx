import React from 'react';
import Header from '@/components/Header/Header';
import ISearchBlock from '@/components/I-SearchBlock/I-SearchBlock';
import { setRequestLocale } from 'next-intl/server';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="text-white header-wrapper">
            <Header underlined={false} scheme="light" />
            <div className="wrapper px-4">
                <ISearchBlock />
            </div>
        </div>
    );
}
