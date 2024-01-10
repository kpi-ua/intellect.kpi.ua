import React from 'react';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

import bottomLogo from '@/assets/svg/kpi-logo.svg';

export default function Layout({ children }: any) {
    return (
        <>
            <Header scheme="dark" />
            <div className="wrapper" style={{ minHeight: '1024px' }}>{children}</div>
            <Footer logoSrc={bottomLogo} />
        </>
    );
}
