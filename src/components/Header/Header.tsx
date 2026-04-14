'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Link, LOCALE } from '@/i18n/routing';
import './Header.module.css';
import { useTranslations, useLocale } from 'next-intl';

import Burger from '../Burger/Burger';
import { cn } from '@/lib/utils';

import darkLogoUk from '@/assets/svg/intellect-logo-dark-uk.svg';
import darkLogoEn from '@/assets/svg/intellect-logo-dark-en.svg';
import lightLogoUk from '@/assets/svg/intellect-logo-light-uk.svg';
import lightLogoEn from '@/assets/svg/intellect-logo-light-en.svg';

import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';

type Props = {
    scheme?: 'dark' | 'light';
    underlined?: boolean;
};

const Header: React.FC<Props> = ({ scheme = 'dark', underlined = true }) => {
    const t = useTranslations('header');
    const locale = useLocale();
    const [burgerCollapsed, setBurgerCollapsed] = useState(true);

    const links = [
        { to: '/', label: t('search') },
        { to: '/about', label: t('about') },
        { to: '/contacts', label: t('contacts') },
    ];

    const logoSrc =
        scheme === 'dark'
            ? locale === LOCALE.EN
                ? darkLogoEn
                : darkLogoUk
            : locale === LOCALE.EN
                ? lightLogoEn
                : lightLogoUk;

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
        <header className={cn('h-100 px-4', underlined && 'header')}>
            <div className="flex justify-between wrapper h-full items-center">
                <Link className="cursor-pointer" href="/">
                    <Image src={logoSrc} alt={t('logo')} />
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
