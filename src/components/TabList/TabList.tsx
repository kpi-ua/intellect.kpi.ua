import './TabList.css'
import React from "react";

type Props = {
    children: React.ReactNode,
    // TODO type for tabs
    tabs: any[],
    selectTab?: (a: any) => void,
    className: string,
    tabActive: any,
}

const TabList: React.FC<Props> = ({children, tabs, selectTab = (newTab: any) => {}, className= '', tabActive}) => {
  return (
    <div className={className}>
      <div className='overflow-x-auto overflow-y-hidden scrollbar-hidden'>
        <div className='flex text-xs text-neutral-400 border-b-1 border-neutral-200 pb-2 items-end gap-17 min-w-700'>
          {tabs.map((tab: any) => (
            <div className={'cursor-pointer ' + (tab.value === tabActive ? 'active-tab' : '')} onClick={() => selectTab(tab.value)} key={tab.value}>{tab.label}</div>
          ))
          }
        </div>
      </div>
      {children}
    </div>
  )
}

export default TabList;
