import styles from './TabList.module.css';
import React from 'react';

type Props = {
    children: React.ReactNode;
    // TODO type for tabs
    tabs: { [key in Intellect.ExperienceType]: string };
    selectTab?: (a: any) => void;
    className: string;
    tabActive: any;
};

const TabList: React.FC<Props> = ({
    children,
    tabs,
    selectTab = (newTab: any) => { console.log('SelectTab received '+ newTab); },
    className = '',
    tabActive,
}) => {
    return (
        <div className={className}>
            <div className="overflow-x-auto overflow-y-hidden scrollbar-hidden">
                <div className="flex text-xs text-neutral-400 border-b-1 border-neutral-200 pb-2 items-end gap-17 min-w-700">
                    {Object.keys(tabs).map((tab) => (
                        <div
                            className={
                                'cursor-pointer ' +
                                (tab === tabActive ? styles['active-tab'] : '')
                            }
                            onClick={() => selectTab(tab)}
                            key={tab}
                        >
                            {tabs[tab as Intellect.ExperienceType]}
                        </div>
                    ))}
                </div>
            </div>
            {children}
        </div>
    );
};

export default TabList;
