import { WorkloadDetails } from './WorkloadDetails';
import React, { FC } from 'react';
import { getEvaluationWorkloads, getRatings } from '@/api/teacher';

interface Props {
    teacherId: string;
    locale?: string;
}

export const WorkloadContainer: FC<Props> = async ({ teacherId, locale }) => {
    const [ratings, workloads] = await Promise.all([getRatings(teacherId, locale), getEvaluationWorkloads(teacherId, locale)]);
    return <WorkloadDetails workloads={workloads} ratings={ratings} />;
};
