import Image from 'next/image';
import React from 'react';
import { CDN_IMG_BASE } from '@/constants';

const AVATAR_STUB_URL = `${CDN_IMG_BASE}/avatar-stub.png`;

type Props = {
  img?: string;
};

const Avatar: React.FC<Props> = ({ img }) => {
  return (
    <div className="w-[170px] h-[200px]">
      <Image
        className="object-cover w-full h-full border-[1px] border-solid border-[#eee] rounded-[5px]"
        src={img || AVATAR_STUB_URL}
        alt="avatar"
        width={0}
        height={0}
        sizes="100vw"
      />
    </div>
  );
};

export default Avatar;
