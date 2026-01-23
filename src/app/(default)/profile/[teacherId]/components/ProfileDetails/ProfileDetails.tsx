import React from 'react';

import SectionTitle from '@/components/common/SectionTitle';

import { academicDegrees, academicStatuses } from '@/constants';
import { Lecturer } from '@/types/intellect';
import { formatRecordValue } from './utils';

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
            {(teacherInfo.contactRecords || []).map((record, idx) => (
                <div className="flex flex-col mt-4 xs:flex-row" key={idx}>
                    <span className="block text-neutral-500 basis-1/4">{record.name}: </span>
                    <span className="basis-3/4 profile-links">{formatRecordValue(record)}</span>
                </div>
            ))}
        </div>
    );
};
