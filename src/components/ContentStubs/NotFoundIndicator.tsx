import type React from 'react';
import Image from 'next/image';

import notFoundSvg from '@/assets/svg/not-found.svg';

type Props = {
    className?: string;
};

const NotFoundIndicator: React.FC<Props> = ({ className = '' }) => {
    return (
        <div className={className}>
            <Image src={notFoundSvg} alt="not found" />
            <div className="text-neutral-300 ">Не знайдено результатів</div>
        </div>
    );
};

export default NotFoundIndicator;
