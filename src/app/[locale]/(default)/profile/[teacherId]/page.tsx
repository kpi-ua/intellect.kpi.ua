import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTeacherByTeacherId } from '@/api/teacher';
import { API_BASE_URL } from '@/api';
import SectionTitle from '@/components/common/SectionTitle';
import { JobLabel } from '@/components/JobLabel/JobLabel';
import Avatar from '@/components/Avatar/Avatar';
import { ProfileDetails } from './components/ProfileDetails/ProfileDetails';
import { Position, Lecturer } from '@/types/intellect';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkloadContainer } from './components/WorkloadDetails/WorkloadContainer';
import { Loader } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

const generateMetaDescription = (teacher: Lecturer | null, t: any): string => {
    if (!teacher) {
        return '';
    }

    const credoOrEmpty = teacher.credo ? `"${teacher.credo}", ` : '';
    const academicDegreeOrEmpty = teacher.academicDegree ? `${t(`profile.academic_degree.${teacher.academicDegree}`)}, ` : '';

    const positionsOrEmpty =
        teacher.positions?.length && `${teacher.positions.map((p) => `${p.name}, ${p.subdivision.name}`)}, `;
    const scientificInterestsOrEmpty = teacher.scientificInterest ? `${teacher.scientificInterest}` : '';

    const finalDescription = credoOrEmpty + academicDegreeOrEmpty + positionsOrEmpty + scientificInterestsOrEmpty;

    if (finalDescription.endsWith(', ')) {
        return finalDescription.slice(0, -2);
    }

    return finalDescription;
};

export async function generateMetadata({ params }: { params: Promise<{ teacherId: string; locale: string }> }): Promise<Metadata> {
    const { teacherId, locale } = await params;
    const commonT = await getTranslations({ locale, namespace: 'global.metadata' });

    try {
        const teacher = await getTeacherByTeacherId(teacherId);
        const description = generateMetaDescription(teacher, await getTranslations({ locale }));

        return {
            title: `${teacher?.fullName} | ${commonT('title')}`,
            description,
            openGraph: {
                title: teacher?.fullName || '',
                description,
                images: teacher?.userIdentifier
                    ? [
                        {
                            url: `${API_BASE_URL}/intellect/v2/persons/${teacher.userIdentifier}/page-preview`,
                        },
                    ]
                    : [],
            },
        };
    } catch (error) {
        return {
            title: commonT('title'),
        };
    }
}

export default async function TeacherProfilePage({ params }: { params: Promise<{ teacherId: string; locale: string }> }) {
    const { teacherId, locale } = await params;
    const t = await getTranslations({ locale, namespace: 'profile' });

    try {
        const teacher = await getTeacherByTeacherId(teacherId);

        return (
            <section className="pt-12 pb-110">
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">{t('back_to_main')}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{teacher?.fullName}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="grid grid-cols-[1fr] sm:grid-cols-[170px_1fr] gap-6 mt-6 justify-items-center sm:justify-items-start relative">
                    <div className="w-48 sm:w-full">
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
                            {(teacher?.positions || []).map((item: Position, idx: number) => (
                                <JobLabel key={idx} position={item} />
                            ))}
                        </div>
                        <Tabs defaultValue="profile">
                            <TabsList>
                                <TabsTrigger value="profile">{t('tabs.profile')}</TabsTrigger>
                                <TabsTrigger value="rating">{t('tabs.rating')}</TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile">
                                <ProfileDetails teacherInfo={teacher} />
                            </TabsContent>
                            <TabsContent value="rating">
                                <Suspense
                                    fallback={
                                        <div className="w-full flex justify-center">
                                            <Loader className="animate-spin" />
                                        </div>
                                    }
                                >
                                    <WorkloadContainer teacherId={teacherId} />
                                </Suspense>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </section>
        );

    } catch (error) {
        notFound()
    }
}
