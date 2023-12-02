import ITeacherSearch from '../I-TeacherSearch/I-TeacherSearch';

import React from 'react';

const ISearchBlock: React.FC = () => {
    return (
        <main>
            <section className="pt-18">
                <div className="text-5xl flex items-center">
                    <h1 className="font-semibold leading-100">Інтелект</h1>
                    <h2 className="border-l text-xl ml-3 pl-3 leading-5">
                        Викладачі
                        <br /> та науковці
                    </h2>
                </div>
                <p className="max-w-500 pt-4">
                    Проєкт об′єднує вчених, викладачів, інженерів та аспірантів університету, які займаються
                    інтелектуальною творчою діяльністю, проводять фундаментальні та прикладні наукові дослідження,
                    впроваджують отримані результати у виробництво, займаються навчальною, методичною і організаційною
                    роботою.
                </p>
                <div className="mt-72 translate-y-50 text-black">
                    <ITeacherSearch />
                </div>
            </section>
        </main>
    );
};

export default ISearchBlock;
