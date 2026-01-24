import SectionTitle from '@/components/common/SectionTitle';
import InfoBlock from '@/components/InfoBlock/InfoBlock';
import { CDN_IMG_BASE } from '@/constants';
import React from 'react';

const aboutImg = `${CDN_IMG_BASE}/about.png`;

export default function About() {
    return (
        <InfoBlock sectionImg={aboutImg}>
            <article>
                <SectionTitle>Про проєкт</SectionTitle>
                <p className="mt-4">
                    Об′єднує вчених, викладачів, інженерів та аспірантів університету, які займаються інтелектуальною
                    творчою діяльністю, проводять фундаментальні та прикладні наукові дослідження, впроваджують отримані
                    результати у виробництво, з аймаються навчальною, методичною і організаційною роботою.
                </p>
                <p className="mt-3">
                    Має за мету поширення знань на державному та світовому рівнях про досягнення співробітників
                    університету в науковій і навчальній роботі, обмін досвідом та сприяння спілкуванню.
                </p>
            </article>
        </InfoBlock>
    );
}
