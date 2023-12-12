import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
};

const SearchGrid: React.FC<Props> = ({ children, className = '' }) => {
    return (
        <div className={'grid grid-cols-teachers gap-6 ' + className}>
            {children}
        </div>
    );
};

export default SearchGrid;
