'use client';
import React, { useState } from 'react';
import styles from './I-TeacherSearch.module.css';
import { useRouter } from 'next/navigation';

import ITab from '@/components/I-Tab/I-Tab';
import InputField from '@/components/InputField/InputField';
import Alphabet from '@/components/Alphabet/Alphabet';

import { tabs } from '@/constants';
import { SearchMode } from '@/types/intellect';

const ITeacherSearch: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overall' as SearchMode);
    const router = useRouter();

    const handleSearch = (input: string, alphabetic?: boolean) => {
        const state_input = alphabetic ? `startsWith:${input}` : input;

        const params = new URLSearchParams();
        params.set('state_input', state_input);
        router.push(`/search?${params.toString()}`);
    };

    const renderInputField = (): React.ReactNode => {
        const currentTab = tabs.find((tab) => tab.type === activeTab);

        if (!currentTab) return null;

        return (
            <InputField
                keyField={currentTab.type}
                buttonText="Пошук"
                buttonClass="xs:flex hidden p-4 h-40 items-center"
                icon="search"
                tips={currentTab.tips}
                fieldClass="px-2 py-4 text-black flex-1 max-h-6 overflow-auto"
                placeholder={currentTab?.placeholder}
                onSubmit={handleSearch}
            />
        );
    };

    return (
        <>
            <div className="flex gap-3 mb-3 overflow-x-auto text-xs text-primary xs:m-0 xs:overflow-x-hidden">
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
                    <Alphabet onLetterSelected={(e) => handleSearch(e, true)} />
                ) : (
                    renderInputField()
                )}
            </div>
        </>
    );
};

export default ITeacherSearch;
