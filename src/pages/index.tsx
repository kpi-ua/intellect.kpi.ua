import React from 'react';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ISearchBlock from '@/components/I-SearchBlock/I-SearchBlock';
import bottomLogo from '@/assets/svg/kpi-logo.svg';

export default function Home() {
    return (
        <>
            <div className="header-wrapper text-white">
                <Header underlined={false} scheme="light" />
                <div className="wrapper">
                    <ISearchBlock />
                </div>
            </div>
            <div className="wrapper">
                <div className="min-h-220" />
            </div>
            <Footer logoSrc={bottomLogo} />
        </>
    );
}
