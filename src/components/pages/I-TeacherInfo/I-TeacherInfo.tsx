import RoutePointer from '../../RoutePointer/RoutePointer';
import SectionTitle from '../../common/SectionTitle';

import avatar from '../../../assets/testdata/avatar1.png'
import JobLabel from '../../JobLabel/JobLabel';
import ContentMap from '../../ContentMap/ContentMap';
import DataList from '../../DataList/DataList';
import TabList from '../../TabList/TabList';
import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {getExperienceByTeacherId} from "../../../api/teacher";
import { experience_tabs } from "../../../constants";

const route = [
  {path: '/', label: 'Головна'},
  {path: '/teacher', label: 'Діденко Юрій Вікторович'}
]

type Props = {
  className?: string,
}

const ContactBlock: React.FC<Props> = ({className = ''}) => (
  <div className={className}>Контактні дані</div>
)

const ITeacherInfo = () => {
  const { teacherId } = useParams();
  const location = useLocation();

  const teacher = location.state?.user;

  const [activeTab, setActiveTab] = useState<Intellect.ExperienceType>(Object.keys(experience_tabs)[0] as Intellect.ExperienceType);
  const [experience, setExperience] = useState<Intellect.TeacherExperience | null>(null);

  useEffect(() => {
    const getExperience = async () => {
      try {
        if (teacherId) {
          const result = await getExperienceByTeacherId(teacherId);
          setExperience(result);
        }
      } catch (e) {
        console.error(e)
      }
    }

    getExperience()
  }, [teacherId]);

  const generateDataPerTab = (): React.JSX.Element[] => {
    if (experience) {
      const experienceObj = experience[activeTab][0]?.Value || {};
      return Object.keys(experienceObj).map((key, idx) => (
          <article className='mt-3 first:mt-0' key={idx} id={String(idx + 1)} data-label={key}>
            <div className="text-primary uppercase text-md">{key}</div>
            <DataList>
              {Object.keys(experienceObj[key]).map((year, idx) => (
                  <div key={idx} className='text-neutral-600 text-xs' data-title={year}>
                    {(experienceObj[key][year]).map((publication: string, idx: number) => (
                        <p className='first:mt-0 mt-3' key={idx} dangerouslySetInnerHTML={{__html: publication.replaceAll('\n', '<br />')}} />
                    ))}
                  </div>
              ))}
            </DataList>
          </article>
        )
      )
    }

    return [];
  }

  return (
    <section className="pt-12 pb-110">
      <RoutePointer routePath={route} />
      <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-6'>
        <div>
          <img src={teacher.Photo} alt='avatar' />
          <ContactBlock className='hidden sm:block' />
        </div>
        <div className='flex-1 w-full'>
          <SectionTitle className='text-3xl sm:text-5xl text-center sm:text-left' isPrimary={false}>{teacher.FullName}</SectionTitle>
          <div className='flex gap-3 mt-5 justify-center sm:justify-start'>
            {/*TODO*/}
            {teacher.Positions.map((item: any) => (<JobLabel key={item.Subdivision.Name} qualification={item.Name} workplace={item.Subdivision.Name} />))}
            <JobLabel qualification='Старший викладач' workplace='КМФДР' />
            <JobLabel qualification='Доцент' workplace='КДР ФМФ' />
          </div>
          <ContactBlock className='block sm:hidden text-center mt-2' />
          <TabList selectTab={newTab => setActiveTab(newTab)} tabActive={activeTab} tabs={experience_tabs} className='mt-9'>
            <ContentMap anchorsClass='hidden sm:block' className='gap-24 mt-4'>
              {generateDataPerTab()}
            </ContentMap>
          </TabList>
        </div>
      </div>
    </section>
  )
}

export default ITeacherInfo;
