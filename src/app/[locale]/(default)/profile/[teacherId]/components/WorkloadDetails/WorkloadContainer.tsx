import { WorkloadDetails } from './WorkloadDetails';
import React, { FC } from 'react';
import { getEvaluationWorkloads, getRatings } from '@/api/teacher';

interface Props {
    teacherId: string;
}

export const WorkloadContainer: FC<Props> = async ({ teacherId }) => {
    const [ratings, workloads] = await Promise.all([getRatings(teacherId), getEvaluationWorkloads(teacherId)]);
    return <WorkloadDetails workloads={workloads} ratings={ratings} />;
};
