import styles from './TabList.module.css';
import React from 'react';

interface TabListProps<T extends string> {
    children: React.ReactNode;
    tabs: Record<T, string>;
    selectTab: (tab: T) => void;
    className: string;
    tabActive: T;
}

const TabList = <T extends string>({ children, tabs, selectTab, className = '', tabActive }: TabListProps<T>) => {
    return (
        <div className={className}>
            <div className="overflow-x-auto overflow-y-hidden scrollbar-hidden">
                <div className="flex items-end pb-2 text-xs text-neutral-400 border-b-1 border-neutral-200 gap-17 min-w-700">
                    {Object.keys(tabs).map((tab) => (
                        <div
                            className={'cursor-pointer ' + (tab === tabActive ? styles['active-tab'] : '')}
                            onClick={() => selectTab(tab as T)}
                            key={tab}
                        >
                            {tabs[tab as T]}
                        </div>
                    ))}
                </div>
            </div>
            {children}
        </div>
    );
};

export default TabList;
