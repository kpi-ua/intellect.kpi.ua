import { WorkloadDetails } from './WorkloadDetails';
import React, { FC } from 'react';
import { getEvaluationWorkloads, getRatings } from '@/api/teacher';
import { Position } from '@/types/intellect';

interface Props {
    teacherId: string;
    positions: Position[];
}

export const WorkloadContainer: FC<Props> = async ({ teacherId, positions }) => {
    const [ratings, workloads] = await Promise.all([getRatings(teacherId), getEvaluationWorkloads(teacherId)]);
    return <WorkloadDetails positions={positions} workloads={workloads} ratings={ratings} />;
};
