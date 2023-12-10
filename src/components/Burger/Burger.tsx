import React from 'react';
import Image from 'next/image';

import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';

import logoDark from '@/assets/svg/intellect-logo-dark.svg';

type Props = {
    children: React.ReactNode;
    className: string;
    scheme: string;
    collapsed: boolean;
    onBurgerClick: (a: boolean) => void;
};

const Burger: React.FC<Props> = ({ children, className = '', scheme, collapsed, onBurgerClick }) => {
    return (
        <div className={className}>
            {collapsed ? (
                <div onClick={() => onBurgerClick(!collapsed)} className="cursor-pointer">
                    <FeatherIcon
                        width={40}
                        height={40}
                        icon="menu"
                        className={scheme === 'light' ? 'text-white' : 'text-black'}
                    />
                </div>
            ) : (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-[9999] px-4 py-5 text-black">
                    <div className="flex justify-between items-center">
                        <Image src={logoDark} alt="logo" />
                        <div onClick={() => onBurgerClick(true)} className="cursor-pointer">
                            <FeatherIcon icon="x" width={40} height={40} />
                        </div>
                    </div>
                    <div className="mt-10">{children}</div>
                </div>
            )}
        </div>
    );
};

export default Burger;
