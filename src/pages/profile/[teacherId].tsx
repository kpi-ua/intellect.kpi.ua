import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Error from 'next/error';
import RoutePointer from '@/components/RoutePointer/RoutePointer';
import SectionTitle from '@/components/common/SectionTitle';
import { JobLabel } from '@/components/JobLabel/JobLabel';
import ContentMap from '@/components/ContentMap/ContentMap';
import DataList from '@/components/DataList/DataList';
import TabList from '@/components/TabList/TabList';
import Avatar from '@/components/Avatar/Avatar';
import { ProfileDetails } from '@/components/ProfileDetails/ProfileDetails';
import { Ratings } from '@/components/Ratings/Ratings';
import useLinkRoute from '@/utils/hooks/useLinkRoute';
import { experienceTabs } from '@/constants';
import { API_BASE_URL } from '@/api/index';
import { getExperienceByTeacherId, getRatings, getTeacherByTeacherId } from '@/api/teacher';
import { AxiosError } from 'axios';
import { ExperienceType, Position, Rating, Lecturer, TeacherExperience } from '@/types/intellect';
import { degreeMap } from '@/utils/maps';

export async function getServerSideProps(context: any) {
    const teacherId = context.params.teacherId;

    try {
        const [teacher, experience, ratings] = await Promise.all([
            getTeacherByTeacherId(teacherId),
            getExperienceByTeacherId(teacherId),
            getRatings(teacherId),
        ]);

        return {
            props: { teacher, experience, ratings },
        };
    } catch (e) {
        const error = e as AxiosError;
        const statusCode = error.response ? error.response.status : 500;

        return {
            props: {
                statusCode,
            },
        };
    }
}

const generateMetaDescription = (teacher: Lecturer | null): string => {
    if (!teacher) {
        return '';
    }

    const credoOrEmpty = teacher.credo ? `"${teacher.credo}", ` : ''; // with quotes
    const academicDegreeOrEmpty = teacher.academicDegree ? `${degreeMap[teacher.academicDegree]}, ` : '';

    const positionsOrEmpty =
        teacher.positions?.length && `${teacher.positions.map((p) => `${p.name}, ${p.subdivision.name}`)}, `;
    const scientificInterestsOrEmpty = teacher.scientificInterest ? `${teacher.scientificInterest}` : '';


    return `${credoOrEmpty} ${academicDegreeOrEmpty} ${positionsOrEmpty} ${scientificInterestsOrEmpty}`;
};


function TeacherInfoPage({
    teacher,
    experience,
    ratings,
    statusCode,
}: {
    teacher: Lecturer | null;
    experience: TeacherExperience | null;
    ratings: Rating[] | null;
    statusCode?: number;
}) {

    if (statusCode) {
        return <Error statusCode={statusCode} withDarkMode={false} />;
    }

    const [activeTab, setActiveTab] = useState<ExperienceType>(Object.keys(experienceTabs)[0] as ExperienceType);

    const { addLink, route } = useLinkRoute();

    useEffect(() => {
        if (teacher && route.length === 1) {
            addLink({ path: '/search', label: teacher.fullName });
        }
    }, [teacher, experience]);

    const generateDataPerTab = (): React.JSX.Element[] => {
        if (!experience) {
            return [];
        }

        const selectedExperience = experience[activeTab];
        const experienceItemKeys = Object.keys(selectedExperience) || [];

        return (experienceItemKeys || []).map((experienceItemKey: string, idx: number) => (
            <article className="mt-3 first:mt-0" key={idx} id={String(idx + 1)} data-label={experienceItemKey}>
                <h1 className="mt-2 font-semibold uppercase text-primary">{experienceItemKey}</h1>
                {Object.keys(selectedExperience[experienceItemKey]).map((key, idx) => (
                    <div key={idx}>
                        <h2 className="text-primary text-md uppercase mt-2.5">{key}</h2>
                        <DataList>
                            {(selectedExperience[experienceItemKey][key] || []).map((data) => {
                                return (
                                    <div key={idx} className="text-xs text-neutral-600" data-title={data.key}>
                                        {(data.value || []).map((publication: string, idx: number) => (
                                            <p
                                                className="mt-3 whitespace-pre-wrap first:mt-0"
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
    };

    const description = generateMetaDescription(teacher);

    const renderTab = (tab: ExperienceType) => {
        switch (tab) {
            case 'profile':
                return teacher ? <ProfileDetails teacherInfo={teacher} /> : null;
            case 'rating':
                return ratings ? <Ratings ratings={ratings} /> : null;
            default:
                return (
                    <ContentMap anchorsClass="hidden sm:block" className="gap-24 mt-4">
                        {generateDataPerTab()}
                    </ContentMap>
                );
        }
    };

    return (
        <>
            <Head>
                <title key="title">{`${teacher?.fullName} | Викладачі та науковці`}</title>

                <meta key="og:title" property="og:title" content={teacher?.fullName}></meta>
                <meta key="og:description" property="og:description" content={description}></meta>
                <meta key="description" name="description" content={description}></meta>

                <meta
                    key="og:image"
                    property="og:image"
                    content={`${API_BASE_URL}/intellect/v2/persons/${teacher?.userIdentifier}/page-preview`}
                ></meta>
            </Head>
            <section className="pt-12 pb-110">
                <RoutePointer routePath={route} />
                <div className="grid grid-cols-[1fr] sm:grid-cols-[170px_1fr] gap-6 mt-6 justify-items-center sm:justify-items-start relative">
                    <div>
                        <Avatar img={teacher?.photo} />
                    </div>
                    <div className="w-full overflow-x-hidden">
                        <SectionTitle className="text-3xl text-center sm:text-5xl sm:text-left" isPrimary={false}>
                            {teacher?.fullName}
                        </SectionTitle>
                        {teacher?.credo ? (
                            <div className="inline-block p-1 mt-5 text-neutral-600 bg-neutral-100 rounded-8">
                                <i>{teacher?.credo}</i>
                            </div>
                        ) : null}
                        <div className="flex justify-center gap-3 mt-5 overflow-x-auto sm:justify-start">
                            {(teacher?.positions || []).map((item: Position) => (
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
                            {renderTab(activeTab)}
                        </TabList>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TeacherInfoPage;
