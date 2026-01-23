import type React from 'react';

import spinnerSvg from '@/assets/svg/spinner.svg';
import Image from 'next/image';

type Props = {
    className: string;
};

const SpinnerIndicator: React.FC<Props> = ({ className = '' }) => {
    return (
        <div className={className}>
            <Image src={spinnerSvg} alt="spinner" />
        </div>
    );
};

export default SpinnerIndicator;
