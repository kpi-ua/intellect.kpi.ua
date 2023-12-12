import React from 'react';
import Image from 'next/image';

import avatarStub from '@/assets/img/avatar-stub.png';

type Props = {
    img?: string;
};

const Avatar: React.FC<Props> = ({ img }) => {
    return (
        <Image
            className="block w-170 h-[200px] avatar"
            src={img || avatarStub}
            alt="avatar"
            width={0}
            height={0}
            sizes="100vw"
        />
    );
};

export default Avatar;
