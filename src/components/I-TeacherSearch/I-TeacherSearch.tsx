import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ITab from '../I-Tab/I-Tab';
import InputField from '../InputField/InputField';
import Alphabet from '../Alphabet/Alphabet';

import './I-TeacherSearch.css';

type Tab = {
  label: string,
  type: Intellect.SearchMode
}

const ITeacherSearch: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overall' as Intellect.SearchMode);
  const navigate = useNavigate();

  const tabs = [
    {label: 'Загальний пошук спiвробiтникiв', type: 'overall'},
    {label: 'Алфавітний покажчик', type: 'alphabetic'},
    {label: 'За кафедрами та факультетами', type: 'subdivision'},
    {label: 'За інтересами', type: 'interests'}
  ] as Tab[];

  const handleSearch = (input: string) => {
    navigate('search', {state: {input, mode: activeTab}})
  }

  return (
    <>
      <div className='flex gap-3 text-xs text-primary mb-3 xs:m-0 overflow-x-auto xs:overflow-x-hidden'>
        {tabs.map(tab => (
          <ITab key={tab.type} isActive={tab.type === activeTab} onClick={() => setActiveTab(tab.type)}>
            {tab.label}
          </ITab>
        ))}
      </div>
      <div className='bg-white flex gap-3 h-100 items-center px-8 rounded-lg rounded-tl-none field-shadow'>
        {
          activeTab === 'alphabetic' ? <Alphabet onLetterSelected={handleSearch} /> : (
            <InputField
              buttonText='Пошук'
              buttonClass='xs:flex hidden p-4 h-40 items-center'
              icon='search'
              fieldClass='text-black flex-1 max-h-6 overflow-auto'
              placeholder='Введіть ПІБ особи.. (наприклад: Петро Петров Петрович)'
              onSubmit={handleSearch}
            />
          )
        }
      </div>
    </>
  )
}

export default ITeacherSearch;
