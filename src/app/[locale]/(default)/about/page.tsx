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
                    Відкритий простір академічних досягнень. Уся ключова інформація про викладачів, їхню наукову діяльність та професійні здобутки зібрана в єдиній системі.
                </p>
                <p className="mt-3">
                    Має за мету поширення знань на державному та світовому рівнях про досягнення співробітників
                    університету в науковій і навчальній роботі, обмін досвідом та сприяння спілкуванню.
                </p>
            </article>
        </InfoBlock>
    );
}
