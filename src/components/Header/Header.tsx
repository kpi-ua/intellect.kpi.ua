'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import './Header.module.css';
import { useTranslations } from 'next-intl';

import Burger from '../Burger/Burger';

import darkLogo from '@/assets/svg/intellect-logo-dark.svg';
import lightLogo from '@/assets/svg/intellect-logo-light.svg';

import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';

type Props = {
    scheme?: 'dark' | 'light';
    underlined?: boolean;
};

const Header: React.FC<Props> = ({ scheme = 'dark', underlined = true }) => {
    const t = useTranslations('header');
    const [burgerCollapsed, setBurgerCollapsed] = useState(true);

    const links = [
        { to: '/', label: t('search') },
        { to: '/about', label: t('about') },
        { to: '/contacts', label: t('contacts') },
    ];

    const logoSrc = scheme === 'dark' ? darkLogo : lightLogo;

    const navigation = (
        <nav className="flex flex-col xs:flex-row gap-10 xs:gap-5 text-4xl xs:text-base leading-none font-medium items-center">
            {links.map((link) => (
                <Link onClick={() => !burgerCollapsed && toggleCollapse(true)} key={link.to} href={link.to || '/'}>
                    {link.label}
                </Link>
            ))}
        </nav>
    );

    const toggleCollapse = (newValue: boolean) => {
        const bodyClass = window.document.body.classList;
        if (newValue && bodyClass.contains('overflow-hidden')) {
            bodyClass.remove('overflow-hidden');
        } else if (!newValue) {
            bodyClass.add('overflow-hidden');
        }

        setBurgerCollapsed(newValue);
    };

    return (
        <header className={'h-100 ' + (underlined ? 'header' : '')}>
            <div className="flex justify-between wrapper h-full items-center">
                <Link className="cursor-pointer" href="/">
                    <Image src={logoSrc} alt="logo" />
                </Link>

                <div className="flex items-center gap-6 h-full">
                    <div className="hidden xs:flex items-center gap-6">
                        {navigation}
                        <LocaleSwitcher />
                    </div>

                    <div className="xs:hidden flex items-center gap-4">
                        <LocaleSwitcher />
                        <Burger
                            onBurgerClick={(value) => toggleCollapse(value)}
                            collapsed={burgerCollapsed}
                            scheme={scheme}
                        >
                            <div className="flex flex-col items-center gap-10">
                                {navigation}
                            </div>
                        </Burger>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
