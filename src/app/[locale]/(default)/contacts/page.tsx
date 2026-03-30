import React from 'react';
import InfoBlock from '@/components/InfoBlock/InfoBlock';
import SectionTitle from '@/components/common/SectionTitle';
import { CDN_IMG_BASE } from '@/constants';
import { getTranslations } from 'next-intl/server';

const sectionImg = `${CDN_IMG_BASE}/contacts.png`;

export default async function Contacts() {
    const t = await getTranslations('contacts');

    return (
        <InfoBlock sectionImg={sectionImg}>
            <div>
                <SectionTitle>{t('title')}</SectionTitle>
                <div className="mt-4">
                    <div className="mt-3">
                        <div>
                            E-mail:{' '}
                            <a className="underline" href="mailto:ecampus@kpi.ua">
                                ecampus@kpi.ua
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </InfoBlock>
    );
}
