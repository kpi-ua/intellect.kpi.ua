import { EvaluationWorkload } from '@/types/intellect';
import {
    WorkloadCategory,
    WorkloadSummary,
    WorkloadTotals,
} from './types';

export const formatYear = (year: number): string => {
    return `${year}-${year + 1}`;
};

export const formatYearShort = (year: number): string => {
    const start = year.toString().slice(-2);
    const end = (year + 1).toString().slice(-2);
    return `${start}/${end}`;
};

export const formatSemester = (semester: number): string => {
    if (semester === 0) return 'Рік';
    return `${semester} Семестр`;
};

export const getDefaultDepartment = (workloads: EvaluationWorkload[]): string => {
    if (workloads.length === 0) return 'all';
    const departments = Array.from(new Set(workloads.map((w) => w.subdivision?.bravoId).filter(Boolean)));
    return departments.length > 0 ? departments[0].toString() : 'all';
};

export const groupWorkloadsByYearRange = (
    workloads: EvaluationWorkload[]
): Record<string, EvaluationWorkload[]> | null => {
    if (workloads.length === 0) {
        return null;
    }

    const grouped: Record<string, EvaluationWorkload[]> = {};

    workloads.forEach((workload) => {
        const academicYearRange = formatYear(workload.year);
        if (!grouped[academicYearRange]) {
            grouped[academicYearRange] = [];
        }
        grouped[academicYearRange].push(workload);
    });

    Object.keys(grouped).forEach((range) => {
        grouped[range].sort((a, b) => {
            if (a.year !== b.year) {
                return a.year - b.year;
            }
            return a.semester - b.semester;
        });
    });

    return grouped;
};

export const getYearOptionsFromGrouped = (
    workloadsByYearRange: Record<string, EvaluationWorkload[]>
): Array<{ value: string; label: string }> => {
    const yearRanges = Object.keys(workloadsByYearRange);

    const now = new Date();
    const currentYearValue = now.getFullYear();
    const currentMonth = now.getMonth();
    const startYear = currentMonth >= 8 ? currentYearValue : currentYearValue - 1;
    const currentRange = `${startYear}-${startYear + 1}`;

    if (!yearRanges.includes(currentRange)) {
        yearRanges.push(currentRange);
    }

    const sortedRanges = yearRanges.sort((a, b) => {
        const aStart = parseInt(a.split('-')[0]);
        const bStart = parseInt(b.split('-')[0]);
        return bStart - aStart;
    });

    return sortedRanges.map((range) => ({
        value: range,
        label: range,
    }));
};

export const getDefaultYearFromGrouped = (workloadsByYearRange: Record<string, EvaluationWorkload[]>): string => {
    const now = new Date();
    const currentYearValue = now.getFullYear();
    const currentMonth = now.getMonth();
    const startYear = currentMonth >= 8 ? currentYearValue : currentYearValue - 1;
    const currentRange = `${startYear}-${startYear + 1}`;

    return currentRange;
};

export const filterWorkloadsByPeriod = (
    workloads: EvaluationWorkload[],
    selectedPeriod: string,
    selectedSubdivision: string
): EvaluationWorkload[] => {
    let filtered = workloads;

    if (selectedPeriod !== '0') {
        filtered = filtered.filter((w) => w.semester.toString() === selectedPeriod);
    }

    if (selectedSubdivision !== 'all') {
        filtered = filtered.filter((w) => w.subdivision?.bravoId.toString() === selectedSubdivision);
    }

    return filtered;
};

export const computeWorkloadSummary = (workloads: EvaluationWorkload[]): WorkloadSummary => {
    const totals = workloads.reduce<WorkloadTotals>(
        (acc, workload) => ({
            educational: acc.educational + workload.educational,
            scientific: acc.scientific + workload.scientific,
            methodical: acc.methodical + workload.methodical,
            organizational: acc.organizational + workload.organizational,
            other: acc.other + workload.other,
        }),
        { educational: 0, scientific: 0, methodical: 0, organizational: 0, other: 0 }
    );

    const total = (Object.keys(totals) as WorkloadCategory[]).reduce((sum, key) => sum + totals[key], 0);

    const toPercent = (value: number) => (total > 0 ? (value / total) * 100 : 0);

    return {
        ...totals,
        percentages: {
            educational: toPercent(totals.educational),
            scientific: toPercent(totals.scientific),
            methodical: toPercent(totals.methodical),
            organizational: toPercent(totals.organizational),
            other: toPercent(totals.other),
        },
    };
}