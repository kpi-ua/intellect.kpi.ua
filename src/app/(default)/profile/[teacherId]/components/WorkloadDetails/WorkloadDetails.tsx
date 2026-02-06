'use client';

import React, { FC, useMemo, useState } from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { EvaluationWorkload, Rating } from '@/types/intellect';
import { Filters } from './Filters';
import { DataTable } from './DataTable';
import { Ratings } from '../Ratings';
import {
    filterWorkloadsByPeriod,
    getDefaultDepartment,
    getDefaultYearFromGrouped,
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

    if (showRatingsArchive) {
        return (
            <div className="mt-4">
                <div className="flex justify-end items-center mb-6">
                    <button
                        onClick={() => setShowRatingsArchive(false)}
                        className="text-sm text-neutral-600 underline hover:text-primary transition-colors"
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
                    className="text-sm text-neutral-600 underline hover:text-primary transition-colors"
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
                    className="text-sm text-neutral-600 underline hover:text-primary transition-colors"
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

            <DataTable workloads={filteredWorkloads} />
            <StackedBarChart
                workloadsByYearRange={workloadsByYearRange}
                yearRange={selectedYear}
                selectedYear={selectedYear}
                selectedPeriod={selectedPeriod}
                selectedDepartment={selectedDepartment}
            />
        </div>
    );
};
