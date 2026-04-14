import { Link } from '@/i18n/routing';
import React from 'react';

import Avatar from '@/components/Avatar/Avatar';
import { Lecturer } from '@/types/intellect';

type Props = {
    teacherInfo: Lecturer;
    className?: string;
};

const ITeacherCard: React.FC<Props> = ({ teacherInfo, className = '' }) => {
    return (
        <Link className={'block cursor-pointer ' + className} href={'/profile/' + teacherInfo.userIdentifier}>
            <Avatar img={teacherInfo.photo} alt={teacherInfo.fullName} />
            <div className="text-semibold">{teacherInfo.fullName}</div>
        </Link>
    );
};

export default ITeacherCard;
