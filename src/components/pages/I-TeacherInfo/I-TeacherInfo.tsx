import RoutePointer from '../../RoutePointer/RoutePointer';
import SectionTitle from '../../common/SectionTitle';

import JobLabel from '../../JobLabel/JobLabel';
import ContentMap from '../../ContentMap/ContentMap';
import DataList from '../../DataList/DataList';
import TabList from '../../TabList/TabList';
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getExperienceByTeacherId, getTeacherByTeacherId} from "../../../api/teacher";
import { experienceTabs } from "../../../constants";
import Avatar from "../../Avatar/Avatar";
import useLinkRoute from "../../../utils/hooks/useLinkRoute";

type Props = {
  className?: string,
  contactRecords: {name: string, value: string}[] | null | undefined
}

const ContactBlock: React.FC<Props> = ({className = '', contactRecords}) => (
  <div className={className}>
    <div className='text-primary'>Контактні дані</div>
    {
      (contactRecords || []).map((record, idx) => (
        <div className='flex gap-3' key={idx}><span className='text-primary'>{record.name}</span><span>{record.value}</span></div>
      ))
    }
  </div>
)

const ITeacherInfo: React.FC = () => {
  const { teacherId } = useParams();

  const [activeTab, setActiveTab] = useState<Intellect.ExperienceType>(Object.keys(experienceTabs)[0] as Intellect.ExperienceType);
  const [experience, setExperience] = useState<Intellect.TeacherExperience | null>(null);
  const [teacher, setTeacher] = useState<Intellect.Teacher | null>(null)

  const { addLink, route } = useLinkRoute();

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

  const getTeacherInfo = async () => {
    try {
      const teacherInfo = await getTeacherByTeacherId(teacherId || '');
      addLink({path: '/search', label: teacherInfo.fullName})
      setTeacher(teacherInfo);
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getTeacherInfo().then(getExperience);
  }, [teacherId]);

  const generateDataPerTab = (): React.JSX.Element[] => {
    if (experience) {
      const selectedExperience = experience[activeTab];
      const experienceItemKeys = Object.keys(selectedExperience) || [];
      
      return (experienceItemKeys || []).map((experienceItemKey: string, idx: number) => (
          <article className='mt-3 first:mt-0' key={idx} id={String(idx + 1)} data-label={experienceItemKey}>
            <div className="text-primary uppercase text-xl">{experienceItemKey}</div>
            {
              Object.keys(selectedExperience[experienceItemKey]).map((key, idx) => (
              <div key={idx}>
                <div className="text-primary text-md">{key}</div>
                <DataList>
                  {(selectedExperience[experienceItemKey][key] || []).map(data => {
                    return (
                      <div key={idx} className='text-neutral-600 text-xs' data-title={data.Key}>
                        {data.Value.map((publication: string, idx: number) => (
                            <p className='first:mt-0 mt-3' key={idx} dangerouslySetInnerHTML={{__html: publication.replaceAll('\n', '<br />')}} />
                        ))}
                      </div>
                    )
                  })}
                </DataList>
              </div>
              ))
            }
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
          <Avatar img={teacher?.photo} />
          <ContactBlock contactRecords={teacher?.contactRecords} className='hidden sm:block' />
        </div>
        <div className='flex-1 w-full'>
          <SectionTitle className='text-3xl sm:text-5xl text-center sm:text-left' isPrimary={false}>{teacher?.fullName}</SectionTitle>
          <div className='flex gap-3 mt-5 justify-center sm:justify-start'>
            {/*TODO*/}
            {(teacher?.positions || []).map((item: any, idx) => (<JobLabel key={item.subdivision.id} qualification={item.name} workplace={item.subdivision.name} />))}
          </div>
          <ContactBlock contactRecords={teacher?.contactRecords} className='block sm:hidden text-center mt-2' />
          <TabList selectTab={newTab => setActiveTab(newTab)} tabActive={activeTab} tabs={experienceTabs} className='mt-9'>
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
