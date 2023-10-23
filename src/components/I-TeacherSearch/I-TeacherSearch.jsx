import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ITab from '../I-Tab/I-Tab';
import InputField from '../InputField/InputField';
import Alphabet from '../Alphabet/Alphabet';

import { decodeHtmlCharCodes } from '../../utils';

import './I-TeacherSearch.css';

const ITeacherSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState('overall');
  const navigate = useNavigate();

  const tabs = [
    {label: 'Загальний пошук спiвробiтникiв', type: 'overall'},
    {label: 'Алфавітний покажчик', type: 'alphabetic'},
    {label: 'За кафедрами та факультетами', type: 'faculty'},
    {label: 'За інтересами', type: 'interests'}
  ]

  const handleLetterSelect = (charCode) => {
    const letter = decodeHtmlCharCodes(charCode);
    navigate('search?mode=alphabetic', {state: {letter}})
  }

  return (
    <>
      <div className='flex gap-3 text-xs text-primary'>
        {tabs.map(tab => (
          <ITab key={tab.type} isActive={tab.type === activeTab} onClick={() => setActiveTab(tab.type)}>
            {tab.label}
          </ITab>
        ))}
      </div>
      <div className='bg-white flex gap-3 h-100 items-center px-8 rounded-lg rounded-tl-none field-shadow'>
        {
          activeTab === 'alphabetic' ? <Alphabet onLetterSelected={handleLetterSelect} /> : (
            <InputField
              buttonText='Пошук'
              icon='search'
              fieldClass='text-black flex-1 max-h-6 overflow-auto'
              placeholder='Введіть ПІБ особи.. (наприклад: Петро Петров Петрович)'
              onInput={e => setSearchValue(e.currentTarget.textContent)}
            />
          )
        }
      </div>
    </>
  )
}

export default ITeacherSearch;
