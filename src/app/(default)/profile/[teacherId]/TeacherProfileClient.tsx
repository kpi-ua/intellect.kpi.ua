'use client';

import React, { useEffect, useState } from 'react';
import RoutePointer from '@/components/RoutePointer/RoutePointer';
import SectionTitle from '@/components/common/SectionTitle';
import { JobLabel } from '@/components/JobLabel/JobLabel';
import TabList from '@/components/TabList/TabList';
import Avatar from '@/components/Avatar/Avatar';
import { ProfileDetails } from '@/components/ProfileDetails/ProfileDetails';
import { Ratings } from '@/components/Ratings/Ratings';
import useLinkRoute from '@/utils/hooks/useLinkRoute';
import { experienceTabs } from '@/constants';
import { ExperienceType, Position, Rating, Lecturer } from '@/types/intellect';

interface TeacherProfileClientProps {
    teacher: Lecturer | null;
    ratings: Rating[] | null;
}

export default function TeacherProfileClient({ teacher, ratings }: TeacherProfileClientProps) {
    const [activeTab, setActiveTab] = useState<ExperienceType>(Object.keys(experienceTabs)[0] as ExperienceType);

    const { addLink, route } = useLinkRoute();

    useEffect(() => {
        if (teacher && route.length === 1) {
            addLink({ path: '/search', label: teacher.fullName });
        }
    }, [teacher, route.length, addLink]);

    const renderTab = (tab: ExperienceType) => {
        switch (tab) {
            case 'profile':
                return teacher ? <ProfileDetails teacherInfo={teacher} /> : null;
            case 'rating':
                return ratings ? <Ratings ratings={ratings} /> : null;
        }
    };

    return (
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
    );
}
