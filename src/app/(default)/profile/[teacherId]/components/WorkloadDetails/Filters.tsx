'use client';

import React, { useMemo } from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EvaluationWorkload } from '@/types/intellect';
import { formatYear } from './utils';

interface FiltersProps {
    workloads: EvaluationWorkload[];
    selectedYear: string;
    selectedDepartment: string;
    selectedPeriod: string;
    onYearChange: (value: string) => void;
    onDepartmentChange: (value: string) => void;
    onPeriodChange: (value: string) => void;
}

export const Filters = ({
    workloads,
    selectedYear,
    selectedDepartment,
    selectedPeriod,
    onYearChange,
    onDepartmentChange,
    onPeriodChange,
}: FiltersProps) => {
    const uniqueYears = useMemo(() => {
        const years = Array.from(new Set(workloads.map((w) => w.year))).sort((a, b) => b - a);
        return years.map((year) => ({ value: year.toString(), label: formatYear(year) }));
    }, [workloads]);

    const uniqueDepartments = useMemo(() => {
        const departments = Array.from(new Set(workloads.map((w) => w.department?.id).filter(Boolean))).map((id) => {
            const workload = workloads.find((w) => w.department?.id === id);
            return { id, name: workload?.department?.name || '' };
        });
        return departments.map((dept) => ({ value: dept.id.toString(), label: dept.name }));
    }, [workloads]);

    const uniquePeriods = useMemo(() => {
        const periods = Array.from(new Set(workloads.map((w) => w.semester))).sort();
        const periodOptions = [
            { value: '0', label: 'Рік' },
            ...periods.filter((p) => p !== 0).map((p) => ({ value: p.toString(), label: `${p} семестр` })),
        ];
        return periodOptions;
    }, [workloads]);

    return (
        <div className="mb-6">
            <SectionTitle className="mb-4 uppercase text-primary">Період оцінювання</SectionTitle>
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
                            {uniquePeriods.map((period) => (
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
