import React from 'react';

type Props = {
    children: React.ReactNode;
    onTagSelect?: (value: string) => void;
};

const Tag: React.FC<Props> = ({ onTagSelect, children }) => {
    return (
        <div className="px-2 py-1 inline-block">
            <div className="inline-block px-10px py-7px border border-gray rounded-24 text-xs">{children}</div>
        </div>
    );
};

export default Tag;
