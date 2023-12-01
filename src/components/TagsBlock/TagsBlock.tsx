import React, { useEffect, useState } from 'react';

import SectionTitle from '../common/SectionTitle';
import Tag from '../Tag/Tag';

type Props = {
    title: string;
    subtitle: string;
    fetchFunction: () => Promise<{ name: string }[] | string[]>;
};

const TagsBlock: React.FC<Props> = ({ title, subtitle, fetchFunction }) => {
    const [tags, setTags] = useState<string[]>([]);
    const getAndSetTags = async () => {
        try {
            const tags = await fetchFunction();
            setTags(tags.map((item) => (typeof item === 'string' ? item : item.name)));
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getAndSetTags();
    }, []);

    return (
        <div className="flex gap-20">
            <div className="w-[400px]">
                <SectionTitle className="text-xl">{title}</SectionTitle>
                <span className="text-neutral-500 text-xs">{subtitle}</span>
            </div>
            <div>
                {tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </div>
        </div>
    );
};

export default TagsBlock;
