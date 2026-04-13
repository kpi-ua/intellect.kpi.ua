'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter, LOCALE } from '@/i18n/routing';
import React from 'react';

const LocaleSwitcher: React.FC = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const onLocaleChange = (nextLocale: string) => {
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <div className="flex gap-2 text-sm font-semibold">
            <button
                onClick={() => onLocaleChange(LOCALE.UK)}
                className={
                    locale === LOCALE.UK ? 'text-primary' : 'text-neutral-400 hover:text-primary transition-colors'
                }
            >
                UA
            </button>
            <span className="text-neutral-300">|</span>
            <button
                onClick={() => onLocaleChange(LOCALE.EN)}
                className={
                    locale === LOCALE.EN ? 'text-primary' : 'text-neutral-400 hover:text-primary transition-colors'
                }
            >
                EN
            </button>
        </div>
    );
};

export default LocaleSwitcher;
