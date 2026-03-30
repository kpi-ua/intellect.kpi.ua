'use client';

import React, { useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EvaluationWorkload } from '@/types/intellect';
import { getYearOptionsFromGrouped } from './utils';
import { useTranslations } from 'next-intl';

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
    const t = useTranslations('profile.workload.filters');
    const uniqueYears = useMemo(() => getYearOptionsFromGrouped(workloadsByYearRange), [workloadsByYearRange]);

    const uniqueDepartments = useMemo(() => {
        const departments = Array.from(new Set(workloads.map((w) => w.subdivision?.bravoId).filter(Boolean))).map((id) => {
            const workload = workloads.find((w) => w.subdivision?.bravoId === id);
            return { id, name: workload?.subdivision?.name || '' };
        });
        return departments.map((dept) => ({ value: dept.id.toString(), label: dept.name }));
    }, [workloads]);

    return (
        <div className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">{t('subdivision')}</label>
                    <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
                        <SelectTrigger>
                            <SelectValue placeholder={t('subdivision_placeholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t('all_subdivisions')}</SelectItem>
                            {uniqueDepartments.map((dept) => (
                                <SelectItem key={dept.value} value={dept.value}>
                                    {dept.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">{t('year')}</label>
                    <Select value={selectedYear} onValueChange={onYearChange}>
                        <SelectTrigger>
                            <SelectValue placeholder={t('year_placeholder')} />
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
                    <label className="block text-sm font-medium text-neutral-700 mb-2">{t('period')}</label>
                    <Select value={selectedPeriod} onValueChange={onPeriodChange}>
                        <SelectTrigger>
                            <SelectValue placeholder={t('period_placeholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">{t('semester_1')}</SelectItem>
                            <SelectItem value="2">{t('semester_2')}</SelectItem>
                            <SelectItem value="0">{t('year_full')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};
