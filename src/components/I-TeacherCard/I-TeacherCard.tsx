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
        <Link className="mx-auto w-fit" href={'/profile/' + teacherInfo.userIdentifier}>
            <div className={'cursor-pointer max-w-160 ' + className}>
                <Avatar img={teacherInfo.photo} alt={teacherInfo.fullName} />
                <div className="text-semibold">{teacherInfo.fullName}</div>
            </div>
        </Link>
    );
};

export default ITeacherCard;
