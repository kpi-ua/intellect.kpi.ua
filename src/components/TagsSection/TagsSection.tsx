import React from 'react';
import TagsBlock from '@/components/TagsBlock/TagsBlock';
import { getFaculties } from '@/api/subdivision';
import { getInterests } from '@/api/teacher';

const tagsOptions = [
    {
        title: 'Список підрозділів',
        subtitle: 'Список інститутів та факультетів',
        fetchFunction: getFaculties,
        mode: 'subdivision' as Intellect.SearchMode,
        lazy: false,
    },
    {
        title: 'Наукові інтереси',
        subtitle: 'Список можливих інтересів і захоплень викладачів',
        fetchFunction: getInterests,
        mode: 'interests' as Intellect.SearchMode,
        lazy: true,
    },
];

const TagsSection: React.FC = () => {
    return (
        <section className="pb-5">
            {tagsOptions.map((item) => (
                <TagsBlock
                    key={item.title}
                    fetchFunction={item.fetchFunction}
                    title={item.title}
                    mode={item.mode}
                    lazy={item.lazy}
                    subtitle={item.subtitle}
                />
            ))}
        </section>
    );
};

export default TagsSection;
