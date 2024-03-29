import Link from 'next/link';
import React from 'react';

import Avatar from '@/components/Avatar/Avatar';

type Props = {
    teacherInfo: Intellect.Teacher;
    className?: string;
};

const ITeacherCard: React.FC<Props> = ({ teacherInfo, className = '' }) => {
    return (
        <Link className="w-fit mx-auto" href={'/profile/' + teacherInfo.userIdentifier}>
            <div className={'cursor-pointer max-w-160 ' + className}>
                <Avatar img={teacherInfo.photo} />
                <div className="text-semibold">{teacherInfo.fullName}</div>
                <div className="text-neutral-900 text-sm mt-1">{teacherInfo.positions[0].name}</div>
                <div className="text-neutral-600 text-xs mt-2">{teacherInfo.positions[0].subdivision.name}</div>
            </div>
        </Link>
    );
};

export default ITeacherCard;
