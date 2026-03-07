import React from 'react';

import SectionTitle from '@/components/common/SectionTitle';

import { academicDegrees, academicStatuses } from '@/constants';
import { ContactType } from '@/types/enums';
import { ContactRecord, Lecturer } from '@/types/intellect';

type Props = {
    teacherInfo: Lecturer;
};

const ProfileInfoRow = ({ title, children }: { title: string; children: React.ReactNode }) =>
    children ? (
        <div className="flex flex-col mt-4 xs:flex-row">
            <span className="block text-neutral-500 basis-1/4">{title}: </span>
            <span className="basis-3/4">{children}</span>
        </div>
    ) : null;

const ContactValue: React.FC<{ record: ContactRecord }> = ({ record }) => {
    switch (record.type) {
        case ContactType.Email:
            return (
                <span>
                    <a href={`mailto:${record.value}`}>{record.value}</a>&nbsp;
                    <i className="fa-solid fa-envelope"></i>
                </span>
            );
        case ContactType.WorkPhone:
            return (
                <span>
                    <a target="_blank" rel="noopener noreferrer" href={`tel:${record.value}`}>
                        {record.value}
                    </a>
                    &nbsp;
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </span>
            );
        default:
            return (
                <span>
                    <a target="_blank" rel="noopener noreferrer" href={record.value}>
                        {record.label || record.value}
                    </a>
                    &nbsp;
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </span>
            );
    }
};

export const ProfileDetails: React.FC<Props> = ({ teacherInfo }) => {
    return (
        <div>
            <SectionTitle className="mt-6 uppercase text-primary">Загальна інформація</SectionTitle>
            <div>
                <ProfileInfoRow title="Наукові інтереси">{teacherInfo.scientificInterest}</ProfileInfoRow>
                <ProfileInfoRow title="Вчене звання">{academicStatuses[teacherInfo.academicStatus]}</ProfileInfoRow>
                <ProfileInfoRow title="Науковий ступінь">{academicDegrees[teacherInfo.academicDegree]}</ProfileInfoRow>
            </div>
            <SectionTitle className="mt-8 uppercase text-primary">Контактні дані</SectionTitle>
            {(teacherInfo.contactRecords || []).map(
                (record, idx): React.JSX.Element => (
                    <div className="flex flex-col mt-4 xs:flex-row" key={idx}>
                        <span className="block text-neutral-500 basis-1/4">{record.name}: </span>
                        <span className="basis-3/4 profile-links">
                            <ContactValue record={record} />
                        </span>
                    </div>
                )
            )}
        </div>
    );
};
