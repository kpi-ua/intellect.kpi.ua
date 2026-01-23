import React from 'react';
import type { Metadata } from 'next';
import { getRatings, getTeacherByTeacherId } from '@/api/teacher';
import { API_BASE_URL } from '@/api/index';
import { academicDegrees } from '@/constants';
import SectionTitle from '@/components/common/SectionTitle';
import { JobLabel } from '@/components/JobLabel/JobLabel';
import Avatar from '@/components/Avatar/Avatar';
import { ProfileDetails } from '@/components/ProfileDetails/ProfileDetails';
import { Ratings } from '@/components/Ratings/Ratings';
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

const generateMetaDescription = (teacher: Lecturer | null): string => {
    if (!teacher) {
        return '';
    }

    const credoOrEmpty = teacher.credo ? `"${teacher.credo}", ` : '';
    const academicDegreeOrEmpty = teacher.academicDegree ? `${academicDegrees[teacher.academicDegree]}, ` : '';

    const positionsOrEmpty =
        teacher.positions?.length && `${teacher.positions.map((p) => `${p.name}, ${p.subdivision.name}`)}, `;
    const scientificInterestsOrEmpty = teacher.scientificInterest ? `${teacher.scientificInterest}` : '';

    const finalDescription = credoOrEmpty + academicDegreeOrEmpty + positionsOrEmpty + scientificInterestsOrEmpty;

    if (finalDescription.endsWith(', ')) {
        return finalDescription.slice(0, -2);
    }

    return finalDescription;
};

export async function generateMetadata({ params }: { params: Promise<{ teacherId: string }> }): Promise<Metadata> {
  try {
    const { teacherId } = await params;
    const teacher = await getTeacherByTeacherId(teacherId);
    const description = generateMetaDescription(teacher);

    return {
      title: `${teacher?.fullName} | Викладачі та науковці`,
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
      title: 'Викладачі та науковці',
    };
  }
}

export default async function TeacherProfilePage({ params }: { params: Promise<{ teacherId: string }> }) {
  const { teacherId } = await params;
  const [teacher, ratings] = await Promise.all([getTeacherByTeacherId(teacherId), getRatings(teacherId)]);

  return (
    <section className="pt-12 pb-110">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Головна</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{teacher?.fullName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
              <JobLabel key={item.subdivision.id} qualification={item.name} workplace={item.subdivision.name} />
            ))}
          </div>
          <Tabs defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile">Профіль</TabsTrigger>
              <TabsTrigger value="rating">Оцінювання НПП</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <ProfileDetails teacherInfo={teacher} />
            </TabsContent>
            <TabsContent value="rating">
              {' '}
              <Ratings ratings={ratings || []} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
