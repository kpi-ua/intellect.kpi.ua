import { WorkloadDetails } from '@/app/(default)/profile/[teacherId]/components/WorkloadDetails/WorkloadDetails';
import React, { FC } from 'react';
import { getEvaluationWorkloads, getRatings, getTeacherByTeacherId } from '@/api/teacher';

interface Props {
    teacherId: string;
}

export const WorkloadContainer: FC<Props> = async ({ teacherId }) => {
    const [ratings, workloads] = await Promise.all([getRatings(teacherId), getEvaluationWorkloads(teacherId)]);
    return <WorkloadDetails workloads={workloads} ratings={ratings} />;
};
