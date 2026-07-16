import { WorkloadDetails } from './WorkloadDetails';
import React, { FC } from 'react';
import { getEvaluationWorkloads, getRatings } from '@/api/teacher';
import { Position } from '@/types/intellect';
import { getTranslations } from 'next-intl/server';
import SectionTitle from '@/components/common/SectionTitle';

interface Props {
    teacherId: string;
    positions: Position[];
}

export const WorkloadContainer: FC<Props> = async ({ teacherId, positions }) => {
    const [ratingsResult, workloadsResult] = await Promise.allSettled([
        getRatings(teacherId),
        getEvaluationWorkloads(teacherId),
    ]);

    if (workloadsResult.status === 'rejected') {
        const t = await getTranslations('profile.workload');

        return (
            <div role="alert">
                <SectionTitle className="mt-3 text-primary">
                    {t('temporarily_unavailable')}
                </SectionTitle>
            </div>
        );
    }

    const ratings = ratingsResult.status === 'fulfilled' ? ratingsResult.value : [];

    return <WorkloadDetails positions={positions} workloads={workloadsResult.value} ratings={ratings} />;
};
