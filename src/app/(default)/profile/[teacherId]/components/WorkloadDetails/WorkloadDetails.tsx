'use client';

import React, { useMemo, useState, useEffect } from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { EvaluationWorkload, Rating } from '@/types/intellect';
import { Filters } from './Filters';
import { DataTable } from './DataTable';
import { StackedBarChart } from './StackedBarChart';
import { Ratings } from '../Ratings';

interface WorkloadDetailsProps {
    workloads: EvaluationWorkload[];
    ratings?: Rating[];
    defaultYear: string;
    defaultPeriod: string;
    defaultDepartment: string;
}

export const WorkloadDetails = ({
    workloads,
    ratings = [],
    defaultYear,
    defaultPeriod,
    defaultDepartment,
}: WorkloadDetailsProps) => {
    const [showRatingsArchive, setShowRatingsArchive] = useState<boolean>(false);

    const [selectedYear, setSelectedYear] = useState<string>(defaultYear);
    const [selectedDepartment, setSelectedDepartment] = useState<string>(defaultDepartment);
    const [selectedPeriod, setSelectedPeriod] = useState<string>(defaultPeriod);

    // Filter workloads based on selections
    const filteredWorkloads = useMemo(() => {
        // First, filter by year and department
        let filtered = workloads.filter((workload) => {
            const yearMatch = !selectedYear || workload.year.toString() === selectedYear;
            const departmentMatch = !selectedDepartment || workload.department?.id.toString() === selectedDepartment;
            return yearMatch && departmentMatch;
        });

        // Handle period filter
        if (selectedPeriod) {
            if (selectedPeriod === '0') {
                // For "Рік", aggregate semester 1 and 2
                filtered = filtered.filter((w) => w.semester === 1 || w.semester === 2);

                // Group by year and department, then sum
                const grouped = new Map<string, EvaluationWorkload>();

                filtered.forEach((workload) => {
                    const key = `${workload.year}-${workload.department?.id || 'none'}`;
                    const existing = grouped.get(key);

                    if (existing) {
                        // Sum the values
                        const educational = (existing.educational || 0) + (workload.educational || 0);
                        const scientific = (existing.scientific || 0) + (workload.scientific || 0);
                        const methodical = (existing.methodical || 0) + (workload.methodical || 0);
                        const organizational = (existing.organizational || 0) + (workload.organizational || 0);
                        const other = (existing.other || 0) + (workload.other || 0);
                        const totalHours = (existing.totalHours || 0) + (workload.totalHours || 0);
                        const totalWorkload = (existing.totalWorkload || 0) + (workload.totalWorkload || 0);

                        // Recalculate percentages
                        const total = educational + scientific + methodical + organizational + other;

                        grouped.set(key, {
                            ...existing,
                            educational,
                            scientific,
                            methodical,
                            organizational,
                            other,
                            totalHours,
                            totalWorkload,
                            educationalPercentage: total > 0 ? (educational / total) * 100 : 0,
                            scientificPercentage: total > 0 ? (scientific / total) * 100 : 0,
                            methodicalPercentage: total > 0 ? (methodical / total) * 100 : 0,
                            organizationalPercentage: total > 0 ? (organizational / total) * 100 : 0,
                            otherPercentage: total > 0 ? (other / total) * 100 : 0,
                            semester: 0, // Mark as "Рік"
                        });
                    } else {
                        // Create new entry with semester 0
                        grouped.set(key, {
                            ...workload,
                            semester: 0,
                        });
                    }
                });

                filtered = Array.from(grouped.values());
            } else {
                // For specific semesters, filter by exact match
                filtered = filtered.filter((w) => w.semester.toString() === selectedPeriod);
            }
        }

        return filtered;
    }, [workloads, selectedYear, selectedDepartment, selectedPeriod]);

    const yearRange = useMemo(() => {
        if (filteredWorkloads.length === 0) return '';
        const years = filteredWorkloads.map((w) => w.year);
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        if (minYear === maxYear) {
            return `${minYear}-${minYear + 1}`;
        }
        return `${minYear}-${maxYear + 1}`;
    }, [filteredWorkloads]);

    if (workloads.length === 0 && (!ratings || ratings.length === 0)) {
        return <SectionTitle className="mt-3 text-primary">Дані відсутні</SectionTitle>;
    }

    if (showRatingsArchive) {
        return (
            <div className="mt-4">
                <div className="flex justify-between items-center mb-6">
                    <SectionTitle className="mb-0 uppercase text-primary">Період оцінювання</SectionTitle>
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

    console.log('selectedYear', selectedYear);
    console.log('selectedDepartment', selectedDepartment);
    console.log('selectedPeriod', selectedPeriod);

    return (
        <div className="mt-4">
            <div className="flex justify-between items-center mb-6">
                <div></div>
                {ratings && ratings.length > 0 && (
                    <button
                        onClick={() => setShowRatingsArchive(true)}
                        className="text-sm text-neutral-600 underline hover:text-primary transition-colors"
                    >
                        Архів рейтингу (до 2024)
                    </button>
                )}
            </div>
            <Filters
                workloads={workloads}
                selectedYear={selectedYear}
                selectedDepartment={selectedDepartment}
                selectedPeriod={selectedPeriod}
                onYearChange={setSelectedYear}
                onDepartmentChange={setSelectedDepartment}
                onPeriodChange={setSelectedPeriod}
            />

            <DataTable workloads={filteredWorkloads} />

            <StackedBarChart workloads={filteredWorkloads} yearRange={yearRange} />
        </div>
    );
};
