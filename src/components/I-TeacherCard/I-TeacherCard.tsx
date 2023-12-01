import React from 'react';
import Avatar from '../Avatar/Avatar';
import { useRouter } from 'next/router';

type Props = {
    teacherInfo: Intellect.Teacher;
    className?: string;
};

const ITeacherCard: React.FC<Props> = ({ teacherInfo, className = '' }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push('/profile/' + teacherInfo.userIdentifier)}
            className={'cursor-pointer max-w-160 ' + className}
        >
            <Avatar img={teacherInfo.photo} />
            <div className="text-semibold">{teacherInfo.fullName}</div>
            <div className="text-neutral-900 text-sm mt-1">{teacherInfo.positions[0].name}</div>
            <div className="text-neutral-600 text-xs mt-2">{teacherInfo.positions[0].subdivision.name}</div>
        </div>
    );
};

export default ITeacherCard;
