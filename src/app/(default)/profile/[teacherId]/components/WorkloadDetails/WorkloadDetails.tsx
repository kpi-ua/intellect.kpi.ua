'use client';

import React, { FC, useMemo, useState } from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { EvaluationWorkload, Rating } from '@/types/intellect';
import { Filters } from './Filters';
import { DataTable } from './DataTable';
import { HourlyDataTable } from './HourlyDataTable';
import { Ratings } from '../Ratings';
import {
    computeWorkloadSummary,
    filterWorkloadsByPeriod,
    getDefaultDepartment,
    getDefaultYearFromGrouped,
    getHighestSalaryLabel,
    groupWorkloadsByYearRange,
} from './utils';
import { StackedBarChart } from './StackedBarChart';

interface Props {
    workloads: EvaluationWorkload[];
    ratings?: Rating[];
}

export const WorkloadDetails: FC<Props> = ({ workloads, ratings = [] }) => {
    console.log(workloads);

    const workloadsByYearRange = groupWorkloadsByYearRange(workloads);
    const defaultYear = getDefaultYearFromGrouped(workloadsByYearRange || {});
    const defaultDepartment = getDefaultDepartment(workloads);

    const [showRatingsArchive, setShowRatingsArchive] = useState(false);

    const [selectedYear, setSelectedYear] = useState(defaultYear);
    const [selectedDepartment, setSelectedDepartment] = useState(defaultDepartment);
    const [selectedPeriod, setSelectedPeriod] = useState('0');

    const filteredWorkloads = useMemo(() => {
        const currentWorkloads = workloadsByYearRange ? workloadsByYearRange[selectedYear] : [];
        return filterWorkloadsByPeriod(currentWorkloads, selectedPeriod, selectedDepartment);
    }, [workloadsByYearRange, selectedPeriod, selectedYear, selectedDepartment]);

    const groupedWorkloads = useMemo(() => {
        const byDept: Record<string, EvaluationWorkload[]> = {};

        filteredWorkloads.forEach((w) => {
            const key = w.subdivision?.bravoId || 'no-sub';
            if (!byDept[key]) byDept[key] = [];
            byDept[key].push(w);
        });

        const main: EvaluationWorkload[] = [];
        const mixed: EvaluationWorkload[] = [];
        const hourly: EvaluationWorkload[] = [];

        Object.values(byDept).forEach((deptWorkloads) => {
            const hasMain = deptWorkloads.some(w => w.salary >= 1);
            const hasMixed = deptWorkloads.some(w => w.salary > 0 && w.salary < 1);

            if (hasMain) {
                main.push(...deptWorkloads);
            } else if (hasMixed) {
                mixed.push(...deptWorkloads);
            } else {
                hourly.push(...deptWorkloads);
            }
        });

        return { main, mixed, hourly };
    }, [filteredWorkloads]);


    if (showRatingsArchive) {
        return (
            <div className="mt-4">
                <div className="flex justify-end items-center mb-6">
                    <button
                        onClick={() => setShowRatingsArchive(false)}
                        className="text-base text-neutral-600 underline hover:text-primary transition-colors"
                    >
                        Деталізація навантаження
                    </button>
                </div>
                <Ratings ratings={ratings} />
            </div>
        );
    }

    if (workloads.length === 0 || !workloadsByYearRange) {
        return (
            <div className="flex justify-between">
                <SectionTitle className="mt-3 text-primary">Дані відсутні</SectionTitle>
                <button
                    onClick={() => setShowRatingsArchive(true)}
                    className="text-base text-black underline hover:text-primary transition-colors"
                >
                    Архів рейтингу (до 2024)
                </button>
            </div>
        );
    }
    return (
        <div className="mt-4">
            <div className="flex justify-between items-start mb-6">
                <SectionTitle className="mb-4 uppercase text-primary">Період оцінювання</SectionTitle>

                <button
                    onClick={() => setShowRatingsArchive(true)}
                    className="text-base text-black underline hover:text-primary transition-colors"
                >
                    Архів рейтингу (до 2024)
                </button>
            </div>
            <Filters
                workloadsByYearRange={workloadsByYearRange}
                workloads={workloads}
                selectedYear={selectedYear}
                selectedDepartment={selectedDepartment}
                selectedPeriod={selectedPeriod}
                onYearChange={setSelectedYear}
                onDepartmentChange={setSelectedDepartment}
                onPeriodChange={setSelectedPeriod}
            />

            {groupedWorkloads.main.length > 0 && (
                <div className="mt-8">
                    <SectionTitle className="mb-4 uppercase text-primary">Основна ставка (1.0)</SectionTitle>
                    <DataTable workloads={groupedWorkloads.main} selectedPeriod={selectedPeriod} hideTitle />
                    <StackedBarChart
                        yearRange={selectedYear}
                        summary={computeWorkloadSummary(groupedWorkloads.main)}
                        rate={getHighestSalaryLabel(groupedWorkloads.main)}
                    />
                </div>
            )}

            {groupedWorkloads.mixed.length > 0 && (
                <div className="mt-8">
                    <SectionTitle className="mb-4 uppercase text-primary">Сумісництво</SectionTitle>
                    <DataTable workloads={groupedWorkloads.mixed} selectedPeriod={selectedPeriod} hideTitle />
                    <StackedBarChart
                        yearRange={selectedYear}
                        summary={computeWorkloadSummary(groupedWorkloads.mixed)}
                        rate={getHighestSalaryLabel(groupedWorkloads.mixed)}
                    />
                </div>
            )}

            {groupedWorkloads.hourly.length > 0 && (
                <div className="mt-8">
                    <SectionTitle className="mb-4 uppercase text-primary">Погодинна оплата</SectionTitle>
                    <HourlyDataTable workloads={groupedWorkloads.hourly} selectedPeriod={selectedPeriod} hideTitle />
                    <StackedBarChart
                        yearRange={selectedYear}
                        summary={computeWorkloadSummary(groupedWorkloads.hourly)}
                        rate={getHighestSalaryLabel(groupedWorkloads.hourly)}
                    />
                </div>
            )}
        </div>
    );
};
