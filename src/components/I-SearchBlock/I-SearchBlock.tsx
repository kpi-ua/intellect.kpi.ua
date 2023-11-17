import ITeacherSearch from '../I-TeacherSearch/I-TeacherSearch';

import React from 'react';

const ISearchBlock: React.FC = () => {
    return (
        <main>
            <section className="pt-18">
                <div className="text-5xl">
                    <h1 className="font-semibold">Інтелект</h1>
                    <h2 className="font-light">Викладачі та науковці</h2>
                </div>
                <p className="max-w-500 pt-4">
                    Проект об′єднує вчених, викладачів, інженерів та аспірантів
                    університету, які займаються інтелектуальною творчою
                    діяльністю, проводять фундаментальні таприкладні наукові
                    дослідження, впроваджують отримані результати в виробництво,
                    займаються навчальною, методичною і організаційною роботою.
                </p>
                <div className="mt-72 translate-y-50 text-black">
                    <ITeacherSearch />
                </div>
            </section>
        </main>
    );
};

export default ISearchBlock;
