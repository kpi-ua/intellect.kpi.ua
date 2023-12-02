import React, { useLayoutEffect, useState } from 'react';

import SectionTitle from '../common/SectionTitle';
import Tag from '../Tag/Tag';
import { useNavigate } from 'react-router-dom';

type Props = {
    title: string;
    subtitle: string;
    mode: Intellect.SearchMode;
    fetchFunction: (a?: number) => Promise<{ name: string }[] | string[]>;
    lazy?: boolean;
};

const LIMIT_TAGS = 12;

const TagsBlock: React.FC<Props> = ({ title, subtitle, mode, fetchFunction, lazy }) => {
    const [tags, setTags] = useState<string[]>([]);
    const [expanded, setExpanded] = useState(false);

    useLayoutEffect(() => {
        getAndSetTags();
    }, []);

    const navigate = useNavigate();

    const getAndSetTags = async (fullList?: boolean) => {
        try {
            const tags = await fetchFunction(lazy && !fullList ? LIMIT_TAGS : undefined);
            setTags(tags.map((item) => (typeof item === 'string' ? item : item.name)));
        } catch (e) {
            console.error(e);
        }
    };

    const handleExpanded = () => {
        setExpanded(true);
        getAndSetTags(true);
    };

    const handleTagSelect = (tagValue: string) => {
        navigate('search', { state: { input: tagValue, mode } });
    };

    return (
        <div className="flex xs:flex-row flex-col mt-10">
            <div className="basis-1/4">
                <SectionTitle className="text-xl">{title}</SectionTitle>
                <span className="text-neutral-500 text-xs">{subtitle}</span>
            </div>
            <div className="basis-3/4">
                {tags.slice(0, expanded ? undefined : LIMIT_TAGS).map((tag, idx) => (
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
