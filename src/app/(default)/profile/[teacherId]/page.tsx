import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getRatings, getTeacherByTeacherId } from '@/api/teacher';
import { API_BASE_URL } from '@/api/index';
import { academicDegrees } from '@/constants';
import { Lecturer } from '@/types/intellect';
import TeacherProfileClient from './TeacherProfileClient';

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

export async function generateMetadata({
    params,
}: {
    params: Promise<{ teacherId: string }>;
}): Promise<Metadata> {
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

export default async function TeacherProfilePage({
    params,
}: {
    params: Promise<{ teacherId: string }>;
}) {
    try {
        const { teacherId } = await params;
        const [teacher, ratings] = await Promise.all([
            getTeacherByTeacherId(teacherId),
            getRatings(teacherId),
        ]);

        return <TeacherProfileClient teacher={teacher} ratings={ratings} />;
    } catch (error) {
        notFound();
    }
}
