import React from 'react';

type Props = {
    className?: string;
    onClick?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    children: React.ReactNode;
};

const CommonButton: React.FC<Props> = ({ className = '', children, onClick, onKeyDown }) => {
    const defaultClasses = 'text-white bg-primary rounded-lg text-center cursor-pointer text-sm ';

    return (
        <div tabIndex={0} onClick={onClick} onKeyDown={onKeyDown} className={defaultClasses + className}>
            {children}
        </div>
    );
};

export default CommonButton;
