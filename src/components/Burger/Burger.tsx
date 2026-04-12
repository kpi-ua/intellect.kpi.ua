import React from 'react';
import Image from 'next/image';

import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';

import { useLocale, useTranslations } from 'next-intl';
import { LOCALE } from '@/i18n/routing';

import logoDarkUk from '@/assets/svg/intellect-logo-dark-uk.svg';
import logoDarkEn from '@/assets/svg/intellect-logo-dark-en.svg';

type Props = {
    children: React.ReactNode;
    className?: string;
    scheme: string;
    collapsed: boolean;
    onBurgerClick: (a: boolean) => void;
};

const Burger: React.FC<Props> = ({ children, className = '', scheme, collapsed, onBurgerClick }) => {
    const locale = useLocale();
    const t = useTranslations('header');
    const logoDark = locale === LOCALE.EN ? logoDarkEn : logoDarkUk;

    return (
        <div className={className}>
            {collapsed ? (
                <div onClick={() => onBurgerClick(!collapsed)} className="cursor-pointer">
                    <FeatherIcon
                        width={40}
                        height={40}
                        icon="menu"
                        className={scheme === 'light' ? 'text-white' : 'text-black'}
                    />
                </div>
            ) : (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-[9999] px-4 py-5 text-black">
                    <div className="flex justify-between items-center">
                        <Image src={logoDark} alt={t('logo')} />
                        <div onClick={() => onBurgerClick(true)} className="cursor-pointer">
                            <FeatherIcon icon="x" width={40} height={40} />
                        </div>
                    </div>
                    <div className="mt-10">{children}</div>
                </div>
            )}
        </div>
    );
};

export default Burger;
