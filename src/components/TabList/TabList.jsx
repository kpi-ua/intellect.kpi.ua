import './TabList.css'

const TabList = ({children, tabs, selectTab = (newTab) => {}, className= '', tabActive}) => {
  return (
    <div className={className}>
      <div className='flex text-xs gap-17 text-neutral-400 border-b-1 border-neutral-200 pb-2 items-end'>
        {tabs.map(tab => (
          <div className={'cursor-pointer ' + (tab.value === tabActive ? 'active-tab' : '')} onClick={() => selectTab(tab.value)} key={tab.value}>{tab.label}</div>
        ))
        }
      </div>
      {children}
    </div>
  )
}

export default TabList;
