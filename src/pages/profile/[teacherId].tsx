import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import RoutePointer from '@/components/RoutePointer/RoutePointer';
import SectionTitle from '@/components/common/SectionTitle';
import JobLabel from '@/components/JobLabel/JobLabel';
import ContentMap from '@/components/ContentMap/ContentMap';
import DataList from '@/components/DataList/DataList';
import TabList from '@/components/TabList/TabList';
import Avatar from '@/components/Avatar/Avatar';
import IProfileDetails from '@/components/I-ProfileDetails/I-ProfileDetails';
import ShareProfile from '@/components/ShareProfile/ShareProfile';
import { Ratings } from '@/components/Ratings/Ratings';

import useLinkRoute from '@/utils/hooks/useLinkRoute';
import { experienceTabs } from '@/constants';
import { API_BASE_URL } from '@/api/index';
import { getExperienceByTeacherId, getRatings, getTeacherByTeacherId } from '@/api/teacher';

/**
 * @description Fetches teacher and experience data on server side.
 * result.props will be passed to the page component as props arguments.
 * @param context
 * @returns
 */
export async function getServerSideProps(context: any) {
    const teacherId = context.params.teacherId;

    const [
        teacher,
        experience,
        ratings
    ] = await Promise.all([
        getTeacherByTeacherId(teacherId),
        getExperienceByTeacherId(teacherId),
        getRatings(teacherId),
    ]);

    return {
        props: { teacher, experience, ratings },
    };
}

/**
 * @description Generates description for og:description meta tag.
 * Important to keep commas and spaces at the beginning of the each section.
 * @param teacher
 * @returns
 */
const generateMetaDescription = (teacher: Intellect.Teacher | null): string => {
    if (!teacher) {
        return '';
    }
    
    const credoOrEmpty = teacher.credo ? `"${teacher.credo}", ` : ''; // with quotes
    const academicDegreeOrEmpty = teacher.academicDegree ? `${teacher.academicDegree}, ` : '';
    const positionsOrEmpty =
        teacher.positions?.length && `${teacher.positions.map((p) => `${p.name}, ${p.subdivision.name}`)}, `;
    const scientificInterestsOrEmpty = teacher.scientificInterest ? `${teacher.scientificInterest}` : '';

    const finalDescription = credoOrEmpty + academicDegreeOrEmpty + positionsOrEmpty + scientificInterestsOrEmpty;

    if (finalDescription.endsWith(', ')) {
        return finalDescription.slice(0, -2);
    }

    return finalDescription;
};

/**
 * @description Argument props are values, returned from getServerSideProps.
 * @param param0
 * @returns
 */
function ITeacherInfo({
    teacher,
    experience,
    ratings,
}: {
    teacher: Intellect.Teacher | null;
    experience: Intellect.TeacherExperience | null;
    ratings: Intellect.Rating[] | null,
}) {
    const [activeTab, setActiveTab] = useState<Intellect.ExperienceType>(
        Object.keys(experienceTabs)[0] as Intellect.ExperienceType
    );

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

    const renderTab = (tab: Intellect.ExperienceType) => {
        switch (tab) {
            case 'profile':
                return teacher ? <IProfileDetails teacherInfo={teacher} /> : null;
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
                    <div className="absolute right-0 sm:hidden">
                        {teacher ? <ShareProfile teacher={teacher} /> : null}
                    </div>
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
                            {(teacher?.positions || []).map((item: Intellect.Position) => (
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

export default ITeacherInfo;

