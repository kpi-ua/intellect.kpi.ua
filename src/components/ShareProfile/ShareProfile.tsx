import type React from 'react';
import { useMemo } from 'react';

import Image from 'next/image';

import shareIcon from '@/assets/svg/share-fat.svg';
import { Lecturer } from '@/types/intellect';

type Props = {
    teacher: Lecturer;
};

const ShareProfile: React.FC<Props> = ({ teacher }) => {
    const teacherMemo = useMemo(() => teacher, [teacher.id]);
    const sharingInfo = {
        title: teacherMemo.fullName,
        text: teacherMemo.credo,
        url: teacherMemo.profile,
    };

    const handleClick = () => {
        if (navigator.canShare && navigator.canShare(sharingInfo)) {
            navigator.share(sharingInfo);
        }
    };

    return (
        <div className="flex items-center justify-center cursor-pointer h-9 min-w-9 rounded-8 border-primary border-1">
            <Image onClick={handleClick} src={shareIcon} alt="share" />
        </div>
    );
};

export default ShareProfile;
