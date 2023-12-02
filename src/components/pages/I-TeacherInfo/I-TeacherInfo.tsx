import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import RoutePointer from '../../RoutePointer/RoutePointer';
import SectionTitle from '../../common/SectionTitle';
import JobLabel from '../../JobLabel/JobLabel';
import ContentMap from '../../ContentMap/ContentMap';
import DataList from '../../DataList/DataList';
import TabList from '../../TabList/TabList';
import IProfileDetails from '../../I-ProfileDetails/I-ProfileDetails';
import Avatar from '../../Avatar/Avatar';

import { getExperienceByTeacherId, getTeacherByTeacherId } from '../../../api/teacher';
import { experienceTabs } from '../../../constants';
import useLinkRoute from '../../../utils/hooks/useLinkRoute';

const ITeacherInfo: React.FC = () => {
    const { teacherId } = useParams();

    const [activeTab, setActiveTab] = useState<Intellect.ExperienceType>(
        Object.keys(experienceTabs)[0] as Intellect.ExperienceType
    );
    const [experience, setExperience] = useState<Intellect.TeacherExperience | null>(null);
    const [teacher, setTeacher] = useState<Intellect.Teacher | null>(null);

    const { addLink, route } = useLinkRoute();

    const getExperience = async () => {
        try {
            if (teacherId) {
                const result = await getExperienceByTeacherId(teacherId);
                setExperience(result);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const getTeacherInfo = async () => {
        try {
            const teacherInfo = await getTeacherByTeacherId(teacherId || '');
            addLink({ path: '/search', label: teacherInfo.fullName });
            setTeacher(teacherInfo);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getTeacherInfo().then(getExperience);
    }, [teacherId]);

    const generateDataPerTab = (): React.JSX.Element[] => {
        if (experience) {
            const selectedExperience = experience[activeTab];
            const experienceItemKeys = Object.keys(selectedExperience) || [];

            return (experienceItemKeys || []).map((experienceItemKey: string, idx: number) => (
                <article className="mt-3 first:mt-0" key={idx} id={String(idx + 1)} data-label={experienceItemKey}>
                    <div className="text-primary uppercase text-xl">{experienceItemKey}</div>
                    {Object.keys(selectedExperience[experienceItemKey]).map((key, idx) => (
                        <div key={idx}>
                            <div className="text-primary text-md">{key}</div>
                            <DataList>
                                {(selectedExperience[experienceItemKey][key] || []).map((data) => {
                                    return (
                                        <div key={idx} className="text-neutral-600 text-xs" data-title={data.key}>
                                            {(data.value || []).map((publication: string, idx: number) => (
                                                <p
                                                    className="first:mt-0 mt-3 break-all"
                                                    key={idx}
                                                    dangerouslySetInnerHTML={{
                                                        __html: publication.replaceAll('\n', '<br />'),
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    );
                                })}
                            </DataList>
                        </div>
                    ))}
                </article>
            ));
        }

        return [];
    };

    return (
        <section className="pt-12 pb-110">
            <RoutePointer routePath={route} />
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-6">
                <div>
                    <Avatar img={teacher?.photo} />
                </div>
                <div className="flex-1 w-full">
                    <SectionTitle className="text-3xl sm:text-5xl text-center sm:text-left" isPrimary={false}>
                        {teacher?.fullName}
                    </SectionTitle>
                    <div className="flex xs:flex-row flex-col gap-3 mt-5 justify-center sm:justify-start overflow-x-auto">
                        {(teacher?.positions || []).map((item: any, idx) => (
                            <JobLabel
                                key={item.subdivision.id}
                                qualification={item.name}
                                workplace={item.subdivision.name}
                            />
                        ))}
                    </div>
                    <TabList
                        selectTab={(newTab) => setActiveTab(newTab)}
                        tabActive={activeTab}
                        tabs={experienceTabs}
                        className="mt-9"
                    >
                        {activeTab !== 'profile' ? (
                            <ContentMap anchorsClass="hidden sm:block" className="gap-24 mt-4">
                                {generateDataPerTab()}
                            </ContentMap>
                        ) : teacher ? (
                            <IProfileDetails teacherInfo={teacher} />
                        ) : null}
                    </TabList>
                </div>
            </div>
        </section>
    );
};

export default ITeacherInfo;
