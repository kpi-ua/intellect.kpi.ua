import React from 'react';
import ISearchBlock from '@/components/I-SearchBlock/I-SearchBlock';
import { NextPageWithLayout } from './_app';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import bottomLogo from '@/assets/svg/kpi-logo.svg';
import TagsSection from '@/components/TagsSection/TagsSection';

const Home: NextPageWithLayout = () => {
    return (
        <>
            {/* <div className="header-wrapper text-white">
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
            ; */}
        </>
    );
};

// Home.getLayout = function getLayout(page) {
//     return (
//         <>
//             <div className="header-wrapper text-white">
//                 <Header underlined={false} scheme="light" />
//             </div>
//             <div className="wrapper">{page}</div>
//             <div className="wrapper">
//                 <div className="min-h-220" />
//             </div>
//             <Footer logoSrc={bottomLogo} />
//         </>
//     );
// };
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
            ;
        </>
    );
};

export default Home;
