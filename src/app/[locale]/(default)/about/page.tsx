import SectionTitle from '@/components/common/SectionTitle';
import InfoBlock from '@/components/InfoBlock/InfoBlock';
import { CDN_IMG_BASE } from '@/constants';
import React from 'react';
import { getTranslations } from 'next-intl/server';

const aboutImg = `${CDN_IMG_BASE}/about.png`;

export default async function About() {
    const t = await getTranslations('about');

    return (
        <InfoBlock sectionImg={aboutImg}>
            <article>
                <SectionTitle>{t('title')}</SectionTitle>
                <p className="mt-4">
                    {t('description_1')}
                </p>
                <p className="mt-3">
                    {t('description_2')}
                </p>
            </article>
        </InfoBlock>
    );
}
