import { useState } from 'react';

import FeatherIcon from '../FeatherIcon/FeatherIcon';
import CommonButton from '../CommonButton/CommonButton';
import ITab from '../I-Tab/I-Tab';

import './I-TeacherSearch.css';

const ITeacherSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState('overall');

  const tabs = [
    {label: 'Загальний пошук спiвробiтникiв', type: 'overall'},
    {label: 'Алфавітний покажчик', type: 'alphabetic'},
    {label: 'За кафедрами та факультетами', type: 'faculty'},
    {label: 'За інтересами', type: 'interests'}
]

  return (
    <>
      <div className='flex gap-3 text-xs text-primary'>
        { tabs.map(tab => (
          <ITab key={tab.type} isActive={tab.type === activeTab} onClick={() => setActiveTab(tab.type)}>
            {tab.label}
          </ITab>
        ))}
      </div>
      <div className='bg-white flex gap-3 h-100 items-center px-8 rounded-lg rounded-tl-none field-shadow'>
        <FeatherIcon icon='search' />
        <div
          className='text-black flex-1 max-h-6 overflow-auto'
          contentEditable
          data-placeholder='Введіть ПІБ особи.. (наприклад: Петро Петров Петрович)'
          onInput={e => setSearchValue(e.currentTarget.textContent)}>
        </div>
        <CommonButton>Пошук</CommonButton>
      </div>
    </>
  )
}

export default ITeacherSearch;
