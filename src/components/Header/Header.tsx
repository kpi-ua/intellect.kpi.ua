import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './Header.module.css';

import Burger from '../Burger/Burger';

import darkLogo from '@/assets/svg/intellect-logo-dark.svg';
import lightLogo from '@/assets/svg/intellect-logo-light.svg';

const links = [
    { to: '/', label: 'Пошук' },
    { to: '/about', label: 'Про проєкт' },
    { to: '/contacts', label: 'Контакти' },
];

type Props = {
    scheme?: 'dark' | 'light';
    underlined?: boolean;
};

const Header: React.FC<Props> = ({ scheme = 'dark', underlined = true }) => {
    const [burgerCollapsed, setBurgerCollapsed] = useState(true);

    const logoSrc = scheme === 'dark' ? darkLogo : lightLogo;

    const navigation = (
        <nav className="flex flex-col xs:flex-row gap-10 xs:gap-5 text-4xl xs:text-base leading-none">
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
                <Burger
                    onBurgerClick={(value) => toggleCollapse(value)}
                    collapsed={burgerCollapsed}
                    scheme={scheme}
                    className="block xs:hidden"
                >
                    {navigation}
                </Burger>
                <div className="hidden xs:block">{navigation}</div>
            </div>
        </header>
    );
};

export default Header;
