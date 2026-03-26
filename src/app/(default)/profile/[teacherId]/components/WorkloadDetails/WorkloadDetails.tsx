'use client';

import React, { FC, useMemo, useState } from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { EvaluationWorkload, Rating } from '@/types/intellect';
import { Filters } from './Filters';
import { DataTable } from './DataTable';
import { MixedDataTable } from './MixedDataTable';
import { HourlyDataTable } from './HourlyDataTable';
import { useGroupedWorkloads, WorkloadGroupType } from './useGroupedWorkloads';
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

    const allGroupedWorkloads = useGroupedWorkloads(filteredWorkloads, selectedPeriod);

    const sections = useMemo(() => {
        const main = allGroupedWorkloads.filter(g => g.normative);
        const mixed = allGroupedWorkloads.filter(g => g.mixed);
        const hourly = allGroupedWorkloads.filter(g => !g.normative && !g.mixed && g.hourly);

        return {
            main: {
                grouped: main,
                workloads: main.flatMap((g: WorkloadGroupType) => [g.normative, g.hourly].filter(Boolean) as EvaluationWorkload[])
            },
            mixed: {
                grouped: mixed,
                workloads: mixed.flatMap((g: WorkloadGroupType) => [g.mixed, g.hourly].filter(Boolean) as EvaluationWorkload[])
            },
            hourly: {
                grouped: hourly,
                workloads: hourly.flatMap((g: WorkloadGroupType) => [g.hourly].filter(Boolean) as EvaluationWorkload[])
            }
        };
    }, [allGroupedWorkloads]);


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

            {sections.main.grouped.length > 0 && (
                <div className="mt-8">
                    <SectionTitle className="mb-4 uppercase text-primary">Основна ставка (1.0)</SectionTitle>
                    <DataTable groupedWorkloads={sections.main.grouped} hideTitle />
                    <StackedBarChart
                        yearRange={selectedYear}
                        summary={computeWorkloadSummary(sections.main.workloads)}
                        rate={getHighestSalaryLabel(sections.main.workloads)}
                    />
                </div>
            )}

            {sections.mixed.grouped.length > 0 && (
                <div className="mt-8">
                    <SectionTitle className="mb-4 uppercase text-primary">Сумісництво</SectionTitle>
                    <MixedDataTable groupedWorkloads={sections.mixed.grouped} hideTitle />
                    <StackedBarChart
                        yearRange={selectedYear}
                        summary={computeWorkloadSummary(sections.mixed.workloads)}
                        rate={getHighestSalaryLabel(sections.mixed.workloads)}
                    />
                </div>
            )}

            {sections.hourly.grouped.length > 0 && (
                <div className="mt-8">
                    <SectionTitle className="mb-4 uppercase text-primary">Погодинна оплата</SectionTitle>
                    <HourlyDataTable groupedWorkloads={sections.hourly.grouped} hideTitle />
                    <StackedBarChart
                        yearRange={selectedYear}
                        summary={computeWorkloadSummary(sections.hourly.workloads)}
                        rate={getHighestSalaryLabel(sections.hourly.workloads)}
                        onlyEducational
                    />
                </div>
            )}
        </div>
    );
};
