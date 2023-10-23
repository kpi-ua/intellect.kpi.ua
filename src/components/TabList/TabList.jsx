import './TabList.css'

const TabList = ({children, tabs, selectTab = (newTab) => {}, className= '', tabActive}) => {
  return (
    <div className={className}>
      <div className='overflow-x-auto overflow-y-hidden scrollbar-hidden'>
        <div className='flex text-xs text-neutral-400 border-b-1 border-neutral-200 pb-2 items-end gap-17 min-w-700'>
          {tabs.map(tab => (
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
