import React from 'react';
import Image, { StaticImageData } from 'next/image';

type Props = {
    sectionImg: StaticImageData;
    children: React.ReactNode;
};

const InfoBlock: React.FC<Props> = ({ sectionImg, children }) => {
    return (
        <section className="flex justify-between items-start mt-9 mb-140 gap-4">
            <div className="max-w-500 shrink-[2]">{children}</div>
            <Image className="max-w-480 hidden sm:block h-auto w-full shrink" src={sectionImg} alt="sectionImg" />
        </section>
    );
};

export default InfoBlock;
