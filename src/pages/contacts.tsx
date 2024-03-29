import React from 'react';

import InfoBlock from '@/components/InfoBlock/InfoBlock';
import SectionTitle from '@/components/common/SectionTitle';

import sectionImg from '@/assets/img/sections/contacts.png';

const Contacts: React.FC = () => {
    return (
        <InfoBlock sectionImg={sectionImg}>
            <div>
                <SectionTitle>Контакти</SectionTitle>
                <div className="mt-4">
                    <div className="leading-6">
                        <div>
                            тел.: <a href="tel:380444549845">+380 (44) 454 98 45</a>
                        </div>
                        <div>
                            факс: <a href="tel:380444549845">+380 (44) 454 98 45</a>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div>
                            e-mail:{' '}
                            <a className="underline" href="mailto:ecampus@kpi.ua">
                                ecampus@kpi.ua
                            </a>
                        </div>
                    </div>
                    <a href="https://ecampus.kpi.ua/feedback" className="block mt-5 text-primary">
                        Форма скарг та пропозицій
                    </a>
                </div>
            </div>
        </InfoBlock>
    );
};

export default Contacts;
