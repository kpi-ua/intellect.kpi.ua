import RoutePointer from '../../RoutePointer/RoutePointer';
import SectionTitle from '../../common/SectionTitle';

import avatar from '../../../assets/testdata/avatar1.png'
import JobLabel from '../../JobLabel/JobLabel';
import ContentMap from '../../ContentMap/ContentMap';
import DataList from '../../DataList/DataList';
import TabList from '../../TabList/TabList';
import React, { useState } from 'react';

const route = [
  {path: '/', label: 'Головна'},
  {path: '/teacher', label: 'Діденко Юрій Вікторович'}
]

const tabs = [
  {label: 'Публікації', value: 'publications'},
  {label: 'Виконання науково-дослідних та дослідно-конструкторських робіт', value: 'exploration'},
  {label: 'Результати виконання науково-дослідних та дослідно-конструкторських робіт', value: 'exploration_results'},
  {label: 'Конференції, виставки', value: 'confs'}
]

type Props = {
  className?: string,
}

const ContactBlock: React.FC<Props> = ({className = ''}) => (
  <div className={className}>Контактні дані</div>
)

const ITeacherInfo = () => {
  const [activeTab, setActiveTab] = useState('publications')

  return (
    <section className="pt-12 pb-110">
      <RoutePointer routePath={route} />
      <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-6'>
        <div>
          <img src={avatar} alt='avatar' />
          <ContactBlock className='hidden sm:block' />
        </div>
        <div className='flex-1 w-full'>
          <SectionTitle className='text-3xl sm:text-5xl text-center sm:text-left' isPrimary={false}>Діденко Юрій Вікторович</SectionTitle>
          <div className='flex gap-3 mt-5 justify-center sm:justify-start'>
            <JobLabel qualification='Старший викладач' workplace='КМФДР' />
            <JobLabel qualification='Доцент' workplace='КДР ФМФ' />
          </div>
          <ContactBlock className='block sm:hidden text-center mt-2' />
          <TabList selectTab={newTab => setActiveTab(newTab)} tabActive={activeTab} tabs={tabs} className='mt-9'>
            <ContentMap anchorsClass='hidden sm:block' className='gap-24 mt-4'>
              <article id='1' data-label='Вітчизняних фахових'>
                <div className="text-primary uppercase text-md">Вітчизняних фахових</div>
                <DataList>
                  <div className='text-neutral-600 text-xs' data-title='2014-2015'>
                    <p>
                      Єнін М.Н. Критична теорія та ідеологічний проект Франфуртської школи" // Актуальні проблеми філософії та соціології. - 2015. - №5.
                    </p>
                  </div>
                </DataList>
              </article>
              <article className='mt-8' id='2' data-label='Закордонних'>
                <div className="text-primary uppercase text-md">Закордонних</div>
                <DataList>
                  <div className='text-neutral-600 text-xs' data-title='2015-2016'>
                    <p>Бібліографічний опис: Енин Максим. THE CHANGE OF THE ATTITUDE OF UKRAINIANS TO RUSSIA IN THE CONDITIONS OF THE ANTI-TERRORISM OPERATION AND HUMANITARIAN AID NEEDS OF POPULATION
                      OF DONBASS REGION: THE RESULTS OF SOCIOLOGICAL RESEARCHES /</p>
                    <p className='mt-3'>Максим Енин // „Swiat Idei i Polityki”. - 2015. - Tom 14. - Rocznik Instytutu Nauk Politycznych Uniwersytetu Kazimierza Wielkiego w Bydgoszczy. - P. 75 - 105.;</p>
                    <p className='mt-3'>Мова публікації: західноєвропейська</p>
                  </div>
                  <div className='text-neutral-600 text-xs' data-title='2016-2017'>
                    <p>Бібліографічний опис: The change of the attitude of Ukrainians to Russia in the condition of the anti-terrorism operation and humanitarian needs of population of Donbass Region:
                      the results of socological researches //</p>
                    <p className='mt-3'>Swiat Idei i Polityki // The months of VII/VIII.2017. ;</p>
                    <p className='mt-3'>Мова публікації: західноєвропейська</p>
                  </div>
                </DataList>
              </article>
              <article className='mt-8' id='3' data-label='Включених до переліку наукових фахових видань України'>
                <div className="text-primary uppercase text-md">Включених до переліку наукових фахових видань України</div>
                <DataList>
                  <div className='text-neutral-600 text-xs' data-title='2016-2017'>
                    <p>Бібліографічний опис: Енин Максим. THE CHANGE OF THE ATTITUDE OF UKRAINIANS TO RUSSIA IN THE CONDITIONS OF THE ANTI-TERRORISM OPERATION AND HUMANITARIAN AID NEEDS OF POPULATION
                      OF DONBASS REGION: THE RESULTS OF SOCIOLOGICAL RESEARCHES /</p>
                    <p className='mt-3'>Максим Енин // „Swiat Idei i Polityki”. - 2015. - Tom 14. - Rocznik Instytutu Nauk Politycznych Uniwersytetu Kazimierza Wielkiego w Bydgoszczy. - P. 75 - 105.;</p>
                    <p className='mt-3'>Мова публікації: західноєвропейська</p>
                  </div><div className='text-neutral-600 text-xs' data-title='2017-2018'>
                    <p>Бібліографічний опис: Енин Максим. THE CHANGE OF THE ATTITUDE OF UKRAINIANS TO RUSSIA IN THE CONDITIONS OF THE ANTI-TERRORISM OPERATION AND HUMANITARIAN AID NEEDS OF POPULATION
                      OF DONBASS REGION: THE RESULTS OF SOCIOLOGICAL RESEARCHES /</p>
                    <p className='mt-3'>Максим Енин // „Swiat Idei i Polityki”. - 2015. - Tom 14. - Rocznik Instytutu Nauk Politycznych Uniwersytetu Kazimierza Wielkiego w Bydgoszczy. - P. 75 - 105.;</p>
                    <p className='mt-3'>Мова публікації: західноєвропейська</p>
                  </div><div className='text-neutral-600 text-xs' data-title='2017-2018'>
                    <p>Бібліографічний опис: Енин Максим. THE CHANGE OF THE ATTITUDE OF UKRAINIANS TO RUSSIA IN THE CONDITIONS OF THE ANTI-TERRORISM OPERATION AND HUMANITARIAN AID NEEDS OF POPULATION
                      OF DONBASS REGION: THE RESULTS OF SOCIOLOGICAL RESEARCHES /</p>
                    <p className='mt-3'>Максим Енин // „Swiat Idei i Polityki”. - 2015. - Tom 14. - Rocznik Instytutu Nauk Politycznych Uniwersytetu Kazimierza Wielkiego w Bydgoszczy. - P. 75 - 105.;</p>
                    <p className='mt-3'>Мова публікації: західноєвропейська</p>
                  </div><div className='text-neutral-600 text-xs' data-title='2018-2019'>
                    <p>Бібліографічний опис: Енин Максим. THE CHANGE OF THE ATTITUDE OF UKRAINIANS TO RUSSIA IN THE CONDITIONS OF THE ANTI-TERRORISM OPERATION AND HUMANITARIAN AID NEEDS OF POPULATION
                      OF DONBASS REGION: THE RESULTS OF SOCIOLOGICAL RESEARCHES /</p>
                    <p className='mt-3'>Максим Енин // „Swiat Idei i Polityki”. - 2015. - Tom 14. - Rocznik Instytutu Nauk Politycznych Uniwersytetu Kazimierza Wielkiego w Bydgoszczy. - P. 75 - 105.;</p>
                    <p className='mt-3'>Мова публікації: західноєвропейська</p>
                  </div>
                </DataList>
              </article>
            </ContentMap>
          </TabList>
        </div>
      </div>
    </section>
  )
}

export default ITeacherInfo;
