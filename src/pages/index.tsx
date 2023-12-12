import React from 'react';

import { NextPageWithLayout } from './_app';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ISearchBlock from '@/components/I-SearchBlock/I-SearchBlock';
import TagsSection from '@/components/TagsSection/TagsSection';

import bottomLogo from '@/assets/svg/kpi-logo.svg';

const Home: NextPageWithLayout = () => {
    return <></>;
};

Home.getLayout = function getLayout(page) {
    return (
        <>
            <div className="header-wrapper text-white">
                <Header underlined={false} scheme="light" />
                <div className="wrapper">
                    <ISearchBlock />
                </div>
            </div>
            <div className="wrapper">
                <div className="min-h-220 mt-16">
                    <TagsSection />
                </div>
            </div>
            <Footer logoSrc={bottomLogo} />;
        </>
    );
};

export default Home;
