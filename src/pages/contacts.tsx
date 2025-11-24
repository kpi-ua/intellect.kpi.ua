import React from 'react';

import InfoBlock from '@/components/InfoBlock/InfoBlock';
import SectionTitle from '@/components/common/SectionTitle';

import sectionImg from '@/assets/img/contacts.png';

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
                    <a href="https://ecampus.kpi.ua/uk/suggestions" className="block mt-5 text-primary">
                        Форма скарг та пропозицій
                    </a>
                </div>
            </div>
        </InfoBlock>
    );
};

export default Contacts;
