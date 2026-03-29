import type React from 'react';
import Image from 'next/image';

import notFoundSvg from '@/assets/svg/not-found.svg';

type Props = {
    className?: string;
    title?: string;
};

const NotFoundIndicator: React.FC<Props> = ({ className = '', title = 'Не знайдено результатів' }) => {
    return (
        <div className={className}>
            <div className="flex justify-center">
                <Image src={notFoundSvg} alt="not found" />
            </div>
            <div className="text-neutral-300 text-center mt-4">{title}</div>
        </div>
    );
};

export default NotFoundIndicator;
