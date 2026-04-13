import React from 'react';
import InfoBlock from '@/components/InfoBlock/InfoBlock';
import SectionTitle from '@/components/common/SectionTitle';
import { CDN_IMG_BASE } from '@/constants';
import { getTranslations } from 'next-intl/server';

import SupportSection from '@/components/SupportSection/SupportSection';

const sectionImg = `${CDN_IMG_BASE}/contacts.png`;

export default async function Contacts() {
    const t = await getTranslations('contacts');

    return (
        <InfoBlock sectionImg={sectionImg}>
            <div className="flex flex-col">
                <SectionTitle>{t('title')}</SectionTitle>
                <SupportSection />
            </div>
        </InfoBlock>
    );
}
