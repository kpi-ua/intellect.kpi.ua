'use client';

import React, { useMemo } from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { EvaluationWorkload } from '@/types/intellect';
import { LegendItem } from './LegendItem';
import { filterWorkloadsByPeriod } from './utils';

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
    const workloads = useMemo(() => {
        return filterWorkloadsByPeriod(workloadsByYearRange[selectedYear], selectedPeriod, selectedDepartment);
    }, [workloadsByYearRange, selectedYear, selectedPeriod, selectedDepartment]);

    const workloadSummary = useMemo(() => {
        const totals = workloads.reduce(
            (acc, workload) => ({
                educational: acc.educational + workload.educational,
                scientific: acc.scientific + workload.scientific,
                methodical: acc.methodical + workload.methodical,
                organizational: acc.organizational + workload.organizational,
                other: acc.other + workload.other,
                totalHours: workload.totalHours,
            }),
            { educational: 0, scientific: 0, methodical: 0, organizational: 0, other: 0, totalHours: 0 }
        );

        const total = totals.educational + totals.scientific + totals.methodical + totals.organizational + totals.other;

        return {
            ...totals,
            percentages: {
                educational: total > 0 ? (totals.educational / total) * 100 : 0,
                scientific: total > 0 ? (totals.scientific / total) * 100 : 0,
                methodical: total > 0 ? (totals.methodical / total) * 100 : 0,
                organizational: total > 0 ? (totals.organizational / total) * 100 : 0,
                other: total > 0 ? (totals.other / total) * 100 : 0,
            },
        };
    }, [workloads]);

    const legendItems = [
        {
            key: 'educational',
            color: '#1C396E',
            label: 'Навчальна',
            hours: workloadSummary.educational,
            percentage: workloadSummary.percentages.educational,
        },
        {
            key: 'scientific',
            color: '#2D5A9E',
            label: 'Наукова',
            hours: workloadSummary.scientific,
            percentage: workloadSummary.percentages.scientific,
        },
        {
            key: 'methodical',
            color: '#4A7AC7',
            label: 'Методична',
            hours: workloadSummary.methodical,
            percentage: workloadSummary.percentages.methodical,
        },
        {
            key: 'organizational',
            color: '#7BA3E0',
            label: 'Організаційна',
            hours: workloadSummary.organizational,
            percentage: workloadSummary.percentages.organizational,
        },
        {
            key: 'other',
            color: '#B0C9F0',
            label: 'Інше',
            hours: workloadSummary.other,
            percentage: workloadSummary.percentages.other,
        },
    ] as const;

    const salary = workloadsByYearRange[selectedYear].toSorted((a,b)=>b.salary - a.salary)[0].salary.toFixed(2)

    return (
        <div className="mt-8">
            <SectionTitle className="mb-4 uppercase text-primary">
                ВИКОНАННЯ НОРМИ: {yearRange} ({salary})
            </SectionTitle>
            <div className="relative">
                <div className="flex overflow-hidden rounded-md h-12">
                    {workloadSummary.percentages.educational > 0 && (
                        <div
                            className="bg-[#1C396E]"
                            style={{ width: `${workloadSummary.percentages.educational}%` }}
                        />
                    )}
                    {workloadSummary.percentages.scientific > 0 && (
                        <div className="bg-[#2D5A9E]" style={{ width: `${workloadSummary.percentages.scientific}%` }} />
                    )}
                    {workloadSummary.percentages.methodical > 0 && (
                        <div className="bg-[#4A7AC7]" style={{ width: `${workloadSummary.percentages.methodical}%` }} />
                    )}
                    {workloadSummary.percentages.organizational > 0 && (
                        <div
                            className="bg-[#7BA3E0]"
                            style={{ width: `${workloadSummary.percentages.organizational}%` }}
                        />
                    )}
                    {workloadSummary.percentages.other > 0 && (
                        <div className="bg-[#B0C9F0]" style={{ width: `${workloadSummary.percentages.other}%` }} />
                    )}
                </div>
                <div className="mt-2 text-right text-sm font-semibold text-neutral-700">
                    {workloadSummary.totalHours.toFixed(2)} год
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {legendItems.map((item) => (
                    <LegendItem
                        key={item.key}
                        color={item.color}
                        label={item.label}
                        hours={item.hours}
                        percentage={item.percentage}
                    />
                ))}
            </div>
        </div>
    );
};
