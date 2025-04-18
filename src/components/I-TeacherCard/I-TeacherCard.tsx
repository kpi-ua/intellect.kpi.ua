import Link from 'next/link';
import React from 'react';

import Avatar from '@/components/Avatar/Avatar';
import { Teacher } from '@/types/intellect';

type Props = {
    teacherInfo: Teacher;
    className?: string;
};

const ITeacherCard: React.FC<Props> = ({ teacherInfo, className = '' }) => {
    return (
        <Link className="mx-auto w-fit" href={'/profile/' + teacherInfo.userIdentifier}>
            <div className={'cursor-pointer max-w-160 ' + className}>
                <Avatar img={teacherInfo.photo} />
                <div className="text-semibold">{teacherInfo.fullName}</div>
                <div className="mt-1 text-sm text-neutral-900">{teacherInfo.positions[0].name}</div>
                <div className="mt-2 text-xs text-neutral-600">{teacherInfo.positions[0].subdivision.name}</div>
            </div>
        </Link>
    );
};

export default ITeacherCard;
