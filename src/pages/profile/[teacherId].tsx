import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { getExperienceByTeacherId, getTeacherByTeacherId } from '@/api/teacher';

import RoutePointer from '@/components/RoutePointer/RoutePointer';
import SectionTitle from '@/components/common/SectionTitle';
import JobLabel from '@/components/JobLabel/JobLabel';
import ContentMap from '@/components/ContentMap/ContentMap';
import DataList from '@/components/DataList/DataList';
import TabList from '@/components/TabList/TabList';
import Avatar from '@/components/Avatar/Avatar';
import IProfileDetails from '@/components/I-ProfileDetails/I-ProfileDetails';

import useLinkRoute from '@/utils/hooks/useLinkRoute';
import { experienceTabs } from '@/constants';
import Head from 'next/head';

export async function getServerSideProps(context: any) {
    const teacherId = context.params.teacherId;

    const teacher = await getTeacherByTeacherId(teacherId);
    const experience = await getExperienceByTeacherId(teacherId);

    return {
        props: { teacher, experience }, // will be passed to the page component as props
    };
}

function ITeacherInfo({
    teacher,
    experience,
}: {
    teacher: Intellect.Teacher | null;
    experience: Intellect.TeacherExperience | null;
}) {
    const [activeTab, setActiveTab] = useState<Intellect.ExperienceType>(
        Object.keys(experienceTabs)[0] as Intellect.ExperienceType
    );

    const { addLink, route } = useLinkRoute();

    useEffect(() => {
        if (teacher) {
            addLink({ path: '/search', label: teacher.fullName });
        }
    }, [teacher, experience]);

    const generateDataPerTab = (): React.JSX.Element[] => {
        if (experience) {
            const selectedExperience = experience[activeTab];
            const experienceItemKeys = Object.keys(selectedExperience) || [];

            return (experienceItemKeys || []).map((experienceItemKey: string, idx: number) => (
                <article className="mt-3 first:mt-0" key={idx} id={String(idx + 1)} data-label={experienceItemKey}>
                    <h1 className="font-semibold uppercase text-primary mt-2">{experienceItemKey}</h1>
                    {Object.keys(selectedExperience[experienceItemKey]).map((key, idx) => (
                        <div key={idx}>
                            <h2 className="text-primary text-md uppercase" style={{ marginTop: '10px' }}>{key}</h2>
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
        <>
            <Head>
                <meta name="og:title" content={teacher?.fullName}></meta>
                <meta
                    name="og:description"
                    content={`${teacher?.academicDegree || ''} \n
                    ${teacher?.positions.map((p) => `${p.name}`).join(',')}\n`}
                ></meta>
            </Head>
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
                        {teacher?.credo ? (
                            <div className="mt-5 text-neutral-600 bg-neutral-100 p-1 inline-block rounded-8">
                                <i>{teacher?.credo}</i>
                            </div>
                        ) : null}
                        <div className="flex gap-3 mt-5 justify-center sm:justify-start overflow-x-auto">
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
        </>
    );
}

export default ITeacherInfo;
