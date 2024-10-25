import styles from './TabList.module.css';
import React from 'react';

interface TabListProps<T extends string> {
    children: React.ReactNode;
    tabs: Record<T, string>;
    selectTab: (tab: T) => void;
    className: string;
    tabActive: T;
};

const TabList = <T extends string>({
    children,
    tabs,
    selectTab,
    className = '',
    tabActive,
}: TabListProps<T>) => {
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
            <br />
            <sup className="text-neutral-500">
                *<b>НДДКР</b> – <a href="https://uk.wikipedia.org/wiki/%D0%9D%D0%B0%D1%83%D0%BA%D0%BE%D0%B2%D0%BE-%D0%B4%D0%BE%D1%81%D0%BB%D1%96%D0%B4%D0%BD%D1%96_%D1%82%D0%B0_%D0%B4%D0%BE%D1%81%D0%BB%D1%96%D0%B4%D0%BD%D0%BE-%D0%BA%D0%BE%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D0%BE%D1%80%D1%81%D1%8C%D0%BA%D1%96_%D1%80%D0%BE%D0%B1%D0%BE%D1%82%D0%B8" rel="noreferrer" target="_blank">Науково-дослідні та дослідно-конструкторські роботи</a>
            </sup>
        </div>
    );
};

export default TabList;
