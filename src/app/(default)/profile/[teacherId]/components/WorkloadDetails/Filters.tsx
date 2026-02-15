'use client';

import React, { useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EvaluationWorkload } from '@/types/intellect';
import { getYearOptionsFromGrouped } from './utils';

interface FiltersProps {
    workloadsByYearRange: Record<string, EvaluationWorkload[]>;
    workloads: EvaluationWorkload[];
    selectedYear: string;
    selectedDepartment: string;
    selectedPeriod: string;
    onYearChange: (value: string) => void;
    onDepartmentChange: (value: string) => void;
    onPeriodChange: (value: string) => void;
}

const PERIOD_OPTIONS = [
    { value: '0', label: 'Рік' },
    { value: '1', label: '1 семестр' },
    { value: '2', label: '2 семестр' },
];

export const Filters = ({
    workloadsByYearRange,
    workloads,
    selectedYear,
    selectedDepartment,
    selectedPeriod,
    onYearChange,
    onDepartmentChange,
    onPeriodChange,
}: FiltersProps) => {
    const uniqueYears = useMemo(() => getYearOptionsFromGrouped(workloadsByYearRange), [workloadsByYearRange]);

    const uniqueDepartments = useMemo(() => {
        const departments = Array.from(new Set(workloads.map((w) => w.subdivision?.id).filter(Boolean))).map((id) => {
            const workload = workloads.find((w) => w.subdivision?.id === id);
            return { id, name: workload?.subdivision?.name || '' };
        });
        return departments.map((dept) => ({ value: dept.id.toString(), label: dept.name }));
    }, [workloads]);

    return (
        <div className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Навчальний рік</label>
                    <Select value={selectedYear} onValueChange={onYearChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Оберіть рік" />
                        </SelectTrigger>
                        <SelectContent>
                            {uniqueYears.map((year) => (
                                <SelectItem key={year.value} value={year.value}>
                                    {year.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Підрозділ</label>
                    <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Оберіть підрозділ" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Загальне</SelectItem>
                            {uniqueDepartments.map((dept) => (
                                <SelectItem key={dept.value} value={dept.value}>
                                    {dept.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Період</label>
                    <Select value={selectedPeriod} onValueChange={onPeriodChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Оберіть період" />
                        </SelectTrigger>
                        <SelectContent>
                            {PERIOD_OPTIONS.map((period) => (
                                <SelectItem key={period.value} value={period.value}>
                                    {period.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};
