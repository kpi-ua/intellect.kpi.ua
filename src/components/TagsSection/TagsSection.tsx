import React from 'react';
import TagsBlock from '../TagsBlock/TagsBlock';
import { getFaculties } from '../../api/subdivision';
import { getInterests } from '../../api/teacher';

const tagsOptions = [
    {
        title: 'Список підрозділів',
        subtitle: 'Список інститутів та факультетів',
        fetchFunction: getFaculties,
    },
    {
        title: 'Наукові інтереси',
        subtitle: 'Список можливих інтересів і захоплень викладачів',
        fetchFunction: getInterests,
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
                    subtitle={item.subtitle}
                />
            ))}
        </section>
    );
};

export default TagsSection;
