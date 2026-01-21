import React from 'react';
import TagsBlock from '@/components/TagsBlock/TagsBlock';

import { getInterests } from '@/api/teacher';

const TagsSection: React.FC = async () => {
  const interests = await getInterests();
  return (
    <section className="pb-5">
      <TagsBlock interests={interests} />
    </section>
  );
};

export default TagsSection;
