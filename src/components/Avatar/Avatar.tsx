import Image from 'next/image';
import React from 'react';
import avatarStub from '@/assets/img/avatar-stub.png';

type Props = {
    img?: string;
};

const Avatar: React.FC<Props> = ({ img }) => {
    return (
        <div className="w-[170px] h-[200px]">
            <Image
                className="object-cover w-full h-full border-[1px] border-solid border-[#eee] rounded-[5px]"
                src={img || avatarStub}
                alt="avatar"
                width={0}
                height={0}
                sizes="100vw"
            />
        </div>
    );
};

export default Avatar;
