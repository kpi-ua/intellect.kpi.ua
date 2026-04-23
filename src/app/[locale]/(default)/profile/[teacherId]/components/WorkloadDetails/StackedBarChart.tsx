import React from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { LegendItem } from './LegendItem';
import { WORKLOAD_CATEGORIES } from './constants';
import { BarSegment } from './BarSegment';
import { WorkloadCategory, WorkloadSummary } from './types';
import { useTranslations } from 'next-intl';

interface Props {
    yearRange: string;
    appointmentAbbreviation: string;
    summary: WorkloadSummary;
    onlyEducational?: boolean;
}

export const StackedBarChart = ({
    yearRange,
    appointmentAbbreviation,
    summary,
    onlyEducational = false,
}: Props) => {
    const t = useTranslations('profile.workload');
    const catT = useTranslations('profile.workload.categories');

    const categories = onlyEducational
        ? WORKLOAD_CATEGORIES.filter((c) => c.key === 'educational')
        : WORKLOAD_CATEGORIES;

    return (
        <div className="mt-8 p-6 border rounded-xl border-text-neutral-900">
            <SectionTitle className="mb-4 uppercase text-primary">
                RELEVANCE: {yearRange} ({appointmentAbbreviation})
            </SectionTitle>

            <div className="flex overflow-hidden rounded-md h-12">
                {categories.map(({ key, color }) => (
                    <BarSegment key={key} color={color} percentage={summary.percentages[key as WorkloadCategory]} hours={summary[key as WorkloadCategory]} />
                ))}
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {categories.map(({ key, color }) => (
                    <LegendItem key={key} color={color} label={catT(key)} percentage={summary.percentages[key as WorkloadCategory]} />
                ))}
            </div>
        </div>
    );
};
