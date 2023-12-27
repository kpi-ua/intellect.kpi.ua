import React, { useState } from 'react';
import styles from './I-TeacherSearch.module.css';
import { useRouter } from 'next/router';

import ITab from '@/components/I-Tab/I-Tab';
import InputField from '@/components/InputField/InputField';
import Alphabet from '@/components/Alphabet/Alphabet';

type Tab = {
    label: string;
    type: Intellect.SearchMode;
    placeholder?: string;
};

const ITeacherSearch: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overall' as Intellect.SearchMode);
    const router = useRouter();

    const tabs = [
        {
            label: 'Загальний пошук спiвробiтникiв',
            type: 'overall',
            placeholder: 'Введіть ПІБ особи.. (наприклад: Петров Петро Петрович)',
        },
        { label: 'Алфавітний покажчик', type: 'alphabetic' },
        {
            label: 'За кафедрами та факультетами',
            type: 'subdivision',
            placeholder: 'Введіть кафедру або факультет.. (наприклад: ФІОТ)',
        },
        {
            label: 'За інтересами',
            type: 'interests',
            placeholder: 'Введіть можливі інтереси.. (наприклад: програмування)',
        },
    ] as Tab[];

    const handleSearch = (input: string) => {
        router.push({
            pathname: '/search',
            query: { state_input: input },
        });
    };

    return (
        <>
            <div className="flex gap-3 text-xs text-primary mb-3 xs:m-0 overflow-x-auto xs:overflow-x-hidden">
                {tabs.map((tab) => (
                    <ITab key={tab.type} isActive={tab.type === activeTab} onClick={() => setActiveTab(tab.type)}>
                        {tab.label}
                    </ITab>
                ))}
            </div>
            <div
                className={
                    'bg-white flex gap-3 h-100 items-center px-8 rounded-lg rounded-tl-none ' + styles['field-shadow']
                }
            >
                {activeTab === 'alphabetic' ? (
                    <Alphabet onLetterSelected={handleSearch} />
                ) : (
                    <InputField
                        buttonText="Пошук"
                        buttonClass="xs:flex hidden p-4 h-40 items-center"
                        icon="search"
                        fieldClass="text-black flex-1 max-h-6 overflow-auto"
                        placeholder={tabs.find((tab) => tab.type === activeTab)?.placeholder}
                        onSubmit={handleSearch}
                    />
                )}
            </div>
        </>
    );
};

export default ITeacherSearch;
