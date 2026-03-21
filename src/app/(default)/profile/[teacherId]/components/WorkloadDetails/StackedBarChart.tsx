'use client';

import React, { useMemo } from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { EvaluationWorkload } from '@/types/intellect';
import { LegendItem } from './LegendItem';
import { computeWorkloadSummary, filterWorkloadsByPeriod, getHighestSalaryLabel, getSalaryLabel } from './utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { WORKLOAD_CATEGORIES } from '@/app/(default)/profile/[teacherId]/components/WorkloadDetails/constants';
import { BarSegment } from '@/app/(default)/profile/[teacherId]/components/WorkloadDetails/BarSegment';

interface Props {
    workloadsByYearRange: Record<string, EvaluationWorkload[]>;
    yearRange: string;
    selectedYear: string;
    selectedPeriod: string;
    selectedDepartment: string;
}

export const StackedBarChart = ({
    workloadsByYearRange,
    yearRange,
    selectedYear,
    selectedPeriod,
    selectedDepartment,
}: Props) => {
    const workloads = useMemo(
        () => filterWorkloadsByPeriod(workloadsByYearRange[selectedYear], selectedPeriod, selectedDepartment),
        [workloadsByYearRange, selectedYear, selectedPeriod, selectedDepartment]
    );

    const summary = useMemo(() => computeWorkloadSummary(workloads), [workloads]);

    const salaryLabel = getHighestSalaryLabel(workloadsByYearRange[selectedYear]);

    return (
        <div className="mt-8">
            <SectionTitle className="mb-4 uppercase text-primary">
                RELEVANCE: {yearRange} н.р. ({salaryLabel})
            </SectionTitle>

            <div className="flex overflow-hidden rounded-md h-12">
                {WORKLOAD_CATEGORIES.map(({ key, color }) => (
                    <BarSegment key={key} color={color} percentage={summary.percentages[key]} hours={summary[key]} />
                ))}
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {WORKLOAD_CATEGORIES.map(({ key, color, label }) => (
                    <LegendItem key={key} color={color} label={label} percentage={summary.percentages[key]} />
                ))}
            </div>
        </div>
    );
};
