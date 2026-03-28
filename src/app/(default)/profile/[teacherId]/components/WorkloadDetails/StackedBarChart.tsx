import React from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { LegendItem } from './LegendItem';
import { WORKLOAD_CATEGORIES } from '@/app/(default)/profile/[teacherId]/components/WorkloadDetails/constants';
import { BarSegment } from '@/app/(default)/profile/[teacherId]/components/WorkloadDetails/BarSegment';
import { WorkloadSummary } from './types';

interface Props {
    yearRange: string;
    rate: string;
    summary: WorkloadSummary;
    onlyEducational?: boolean;
}

export const StackedBarChart = ({
    yearRange,
    rate,
    summary,
    onlyEducational = false,
}: Props) => {
    const categories = onlyEducational
        ? WORKLOAD_CATEGORIES.filter((c) => c.key === 'educational')
        : WORKLOAD_CATEGORIES;

    return (
        <div className="mt-8 p-6 border rounded-xl border-text-neutral-900">
            <SectionTitle className="mb-4 uppercase text-primary">
                RELEVANCE: {yearRange} ({rate})
            </SectionTitle>

            <div className="flex overflow-hidden rounded-md h-12">
                {categories.map(({ key, color }) => (
                    <BarSegment key={key} color={color} percentage={summary.percentages[key]} hours={summary[key]} />
                ))}
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {categories.map(({ key, color, label }) => (
                    <LegendItem key={key} color={color} label={label} percentage={summary.percentages[key]} />
                ))}
            </div>
        </div>
    );
};
