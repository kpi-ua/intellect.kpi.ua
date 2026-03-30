'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
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
                onClick={() => onLocaleChange('uk')}
                className={locale === 'uk' ? 'text-primary' : 'text-neutral-400 hover:text-primary transition-colors'}
            >
                UA
            </button>
            <span className="text-neutral-300">|</span>
            <button
                onClick={() => onLocaleChange('en')}
                className={locale === 'en' ? 'text-primary' : 'text-neutral-400 hover:text-primary transition-colors'}
            >
                EN
            </button>
        </div>
    );
};

export default LocaleSwitcher;
