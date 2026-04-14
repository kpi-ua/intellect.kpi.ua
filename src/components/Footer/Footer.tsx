'use client';
import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Props = {
    logoSrc: string;
};

const Footer: React.FC<Props> = ({ logoSrc }) => {
    const t = useTranslations('footer');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white text-sm px-4">
            <div className="wrapper flex sm:flex-row sm:text-left text-center flex-col justify-between py-9 gap-9">
                <Image className="max-w-120 mx-auto" src={logoSrc} alt="logo" />
                <section>
                    <p>
                        {t('university')} &copy; 1998-{currentYear}
                    </p>
                    <p className="mt-2">
                        {t('address_label')}:{' '}
                        <a href="https://kpi.ua/location">{t('address')}</a>
                    </p>
                </section>
                <section>
                    <p>
                        <a href="https://kbis.kpi.ua">{t('developer')}</a>
                    </p>
                    <p className="mt-2">
                        {t('project_prefix')}
                        <br />
                        <a href="https://ecampus.kpi.ua">{t('project_name')}</a>
                    </p>
                </section>
                <section>
                    <p>
                        {t('usage_terms')}{' '}
                        <a href="https://intellect.kpi.ua">intellect.kpi.ua</a>
                    </p>
                </section>
            </div>
        </footer>
    );
};

export default Footer;
