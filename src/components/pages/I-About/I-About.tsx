import InfoBlock from '../../InfoBlock/InfoBlock';
import SectionTitle from '../../common/SectionTitle';

import aboutImg from '../../../assets/img/sections/about.png';
import React from "react";

const IAbout: React.FC = () => {
  return (
    <InfoBlock sectionImg={aboutImg}>
      <article>
        <SectionTitle>Про проект</SectionTitle>
        <p className='mt-4'>
          Об′єднує вчених, викладачів, інженерів та аспірантів університету, які займаються інтелектуальною творчою діяльністю,
          проводять фундаментальні та прикладні наукові дослідження, впроваджують отримані результати в виробництво, з
          аймаються навчальною, методичною і організаційною роботою.
        </p>
        <p className='mt-3'>
          Має за мету поширення знань на державному та світовому рівнях про досягнення співробітників університету в науковій
          і навчальній роботі, обмін досвідом та сприяння спілкуванню.
        </p>
      </article>
    </InfoBlock>
  )
}

export default IAbout;
