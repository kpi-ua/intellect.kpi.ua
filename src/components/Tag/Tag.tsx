import React from 'react';

type Props = {
    children?: string;
    onTagSelect?: (value: string) => void;
    expander?: boolean;
    expand?: () => void;
};

const Tag: React.FC<Props> = ({ onTagSelect, children, expander = false, expand }) => {
    const handleTagSelect = onTagSelect ? () => onTagSelect(children as string) : undefined;

    return (
        <div className="px-2 py-1 inline-block">
            <div
                onClick={expander ? expand : handleTagSelect}
                className={`cursor-pointer transition-colors inline-block px-10px py-7px border hover:border-primary hover:text-primary rounded-24 text-xs ${
                    expander ? 'text-brand-600 border-brand-600' : 'border-gray'
                }`}
            >
                {expander ? 'Показати більше' : children}
            </div>
        </div>
    );
};

export default Tag;
