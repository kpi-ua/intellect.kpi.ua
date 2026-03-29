import ITeacherSearch from '../I-TeacherSearch/I-TeacherSearch';
import React from 'react';
import { getTranslations } from 'next-intl/server';

const ISearchBlock: React.FC = async () => {
    const t = await getTranslations('home');

    return (
        <main>
            <section className="pt-18">
                <div className="text-5xl flex items-center">
                    <h1 className="font-semibold text-5xl">{t('title')}</h1>
                    <h2 className="border-l text-xl ml-3 pl-3 leading-5">
                        {t('subtitle').split(' ')[0]}
                        <br /> {t('subtitle').split(' ').slice(1).join(' ')}
                    </h2>
                </div>
                <p className="max-w-[500px] pt-4">
                    {t('description')}
                </p>
                <div className="mt-72 translate-y-50 text-black">
                    <ITeacherSearch />
                </div>
            </section>
        </main>
    );
};

export default ISearchBlock;
