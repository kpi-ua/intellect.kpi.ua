import React from 'react';

import InfoBlock from '@/components/InfoBlock/InfoBlock';
import SectionTitle from '@/components/common/SectionTitle';
import { CDN_IMG_BASE } from '@/constants';

const sectionImg = `${CDN_IMG_BASE}/contacts.png`;

const Contacts: React.FC = () => {
    return (
        <InfoBlock sectionImg={sectionImg}>
            <div>
                <SectionTitle>Контакти</SectionTitle>
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
};

export default Contacts;
