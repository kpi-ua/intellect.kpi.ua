import React from 'react';
import Image, { StaticImageData } from 'next/image';

type Props = {
    sectionImg: StaticImageData | string;
    children: React.ReactNode;
};

const InfoBlock: React.FC<Props> = ({ sectionImg, children }) => {
    return (
        <section className="flex flex-col lg:flex-row justify-between items-start mt-9 mb-140 gap-8">
            <div className="max-w-full lg:max-w-[700px] shrink-0">{children}</div>
            <Image
                className="max-w-[480px] hidden lg:block h-auto w-full shrink self-center lg:self-start"
                src={sectionImg}
                width={480}
                height={480}
                alt="sectionImg"
            />
        </section>
    );
};

export default InfoBlock;
