'use client';
import React, { useState } from 'react';
import styles from './I-TeacherSearch.module.css';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

import { Tabs, TabsList, TabsContent, TabSheetTrigger } from '@/components/ui/tabs';
import InputField from '@/components/InputField/InputField';
import Alphabet from '@/components/Alphabet/Alphabet';

import { SearchMode } from '@/types/intellect';

const ITeacherSearch: React.FC = () => {
    const t = useTranslations('search');
    const [activeTab, setActiveTab] = useState('persons' as SearchMode);
    const router = useRouter();

    const tabs = [
        {
            label: t('overall.label'),
            type: 'persons' as const,
            placeholder: t('overall.placeholder'),
            tips: true,
        },
        { label: t('alphabetic.label'), type: 'alphabetic' as const },
        {
            label: t('interests.label'),
            type: 'interests' as const,
            placeholder: t('interests.placeholder'),
            tips: true,
        },
    ];

    const handleSearch = (input: string, alphabetic?: boolean) => {
        const state_input = alphabetic ? `startsWith:${input}` : input;

        const params = new URLSearchParams();
        params.set('state_input', state_input);
        router.push(`/search?${params.toString()}`);
    };

    return (
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as SearchMode)}>
            <TabsList className="mb-3 flex flex-nowrap w-full gap-3 overflow-x-auto bg-transparent border-none min-w-0 scrollbar-hidden pb-1 md:pb-0 md:mb-[-1px]">
                {tabs.map((tab) => (
                    <TabSheetTrigger
                        key={tab.type}
                        value={tab.type}
                        className="min-w-100 w-200"
                    >
                        {tab.label}
                    </TabSheetTrigger>
                ))}
            </TabsList>
            <div
                className={
                    'bg-white flex gap-3 h-100 items-center px-8 rounded-[4px] md:rounded-tl-none ' + styles['field-shadow']
                }
            >
                <TabsContent value="persons" className="w-full">
                    <InputField
                        placeholder={tabs[0].placeholder}
                        onSubmit={handleSearch}
                        onTipClick={(v) => router.push(`/profile/${v}`)}
                    />
                </TabsContent>
                <TabsContent value="alphabetic" className="w-full">
                    <Alphabet onLetterSelected={(e) => handleSearch(e, true)} />
                </TabsContent>
                <TabsContent value="interests" className="w-full">
                    <p>{t('interests.in_development')}</p>
                </TabsContent>
            </div>
        </Tabs>
    );
};

export default ITeacherSearch;
