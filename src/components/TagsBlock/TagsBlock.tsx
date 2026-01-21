'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import SectionTitle from '../common/SectionTitle';
import Tag from '../Tag/Tag';

interface Props {
    interests: string[];
};

const LIMIT_TAGS = 24;

const TagsBlock: React.FC<Props> = ({  interests }) => {
    const [expanded, setExpanded] = useState(false);
    const router = useRouter();

    const handleExpanded = () => {
        setExpanded(true);
    };

    const handleTagSelect = (tagValue: string) => {
        const params = new URLSearchParams();
        params.set('state_input', tagValue);
        router.push(`/search?${params.toString()}`);
    };

    return (
        <div className="flex xs:flex-row flex-col mt-10">
            <div className="basis-1/4">
                <SectionTitle className="text-xl">Наукові інтереси</SectionTitle>
                <span className="text-neutral-500 text-xs">Список можливих інтересів і захоплень викладачів</span>
            </div>
            <div className="basis-3/4">
                {interests.slice(0, expanded ? undefined : LIMIT_TAGS).map((tag, idx) => (
                    <Tag onTagSelect={handleTagSelect} key={idx}>
                        {tag}
                    </Tag>
                ))}
                {!expanded ? <Tag expand={handleExpanded} expander={true} /> : null}
            </div>
        </div>
    );
};

export default TagsBlock;
