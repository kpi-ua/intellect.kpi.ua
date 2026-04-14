'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CDN_IMG_BASE } from '@/constants';

const AVATAR_STUB_URL = `${CDN_IMG_BASE}/avatar-stub.png`;

type Props = {
    img?: string;
    alt?: string;
};

const Avatar: React.FC<Props> = ({ img, alt }) => {
    const [src, setSrc] = useState(img || AVATAR_STUB_URL);

    useEffect(() => {
        setSrc(img || AVATAR_STUB_URL);
    }, [img]);

    return (
        <div className="aspect-[3/4]">
            <Image
                className="object-cover w-full h-full border-[1px] border-solid border-[#eee] rounded-[5px]"
                src={src}
                alt={alt || 'Avatar'}
                width={0}
                height={0}
                sizes="100vw"
                onError={() => setSrc(AVATAR_STUB_URL)}
            />
        </div>
    );
};

export default Avatar;
