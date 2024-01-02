import React from 'react';
import TagsBlock from '@/components/TagsBlock/TagsBlock';

import { tagsOptions } from '@/constants';

const TagsSection: React.FC = () => {
    return (
        <section className="pb-5">
            {tagsOptions.map((item) => (
                <TagsBlock
                    key={item.title}
                    fetchFunction={item.fetchFunction}
                    title={item.title}
                    lazy={item.lazy}
                    subtitle={item.subtitle}
                />
            ))}
        </section>
    );
};

export default TagsSection;
