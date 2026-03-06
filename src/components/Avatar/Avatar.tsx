'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { CDN_IMG_BASE } from '@/constants';

const AVATAR_STUB_URL = `${CDN_IMG_BASE}/avatar-stub.png`;

type Props = {
    img?: string;
};

const Avatar: React.FC<Props> = ({ img }) => {
    const [src, setSrc] = useState(img || AVATAR_STUB_URL);

    return (
        <div className="w-[170px] h-[200px]">
            <Image
                className="object-cover w-full h-full border-[1px] border-solid border-[#eee] rounded-[5px]"
                src={src}
                alt="avatar"
                width={0}
                height={0}
                sizes="100vw"
                onError={() => setSrc(AVATAR_STUB_URL)}
            />
        </div>
    );
};

export default Avatar;
