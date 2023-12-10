import React from 'react';

import SectionTitle from '@/components/common/SectionTitle';

import { profileTabs } from '@/constants';
import { reformatLinks } from '@/utils';

type Props = {
    teacherInfo: Intellect.Teacher;
};

const IProfileDetails: React.FC<Props> = ({ teacherInfo }) => {
    const generateProfileRows = (): React.JSX.Element[] => {
        return Object.keys(profileTabs).map((key, idx) => (
            <div key={idx}>
                {profileTabs[key].map((row) =>
                    teacherInfo[row.field] ? (
                        <div className="flex flex-col xs:flex-row mt-4" key={row.field}>
                            <span className="text-neutral-500 block basis-1/4">{row.label}: </span>
                            <span
                                dangerouslySetInnerHTML={{ __html: reformatLinks(teacherInfo[row.field]) }}
                                className="basis-3/4"
                            />
                        </div>
                    ) : null
                )}
            </div>
        ));
    };

    return (
        <div>
            <SectionTitle className="uppercase text-primary mt-6">Загальна інформація</SectionTitle>
            {generateProfileRows()}
            <SectionTitle className="uppercase text-primary mt-8">Контактні дані</SectionTitle>
            {(teacherInfo.contactRecords || []).map(
                (record, idx): React.JSX.Element => (
                    <div className="flex flex-col xs:flex-row mt-4" key={idx}>
                        <span className="text-neutral-500 block basis-1/4">{record.name}: </span>
                        <span
                            dangerouslySetInnerHTML={{ __html: reformatLinks(record.value) || '' }}
                            className="basis-3/4"
                        />
                    </div>
                )
            )}
        </div>
    );
};

export default IProfileDetails;
