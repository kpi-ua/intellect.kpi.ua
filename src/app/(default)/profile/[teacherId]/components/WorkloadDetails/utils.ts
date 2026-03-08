import { EvaluationWorkload } from '@/types/intellect';
import {
    WorkloadCategory,
    WorkloadSummary,
    WorkloadTotals,
} from '@/app/(default)/profile/[teacherId]/components/WorkloadDetails/types';

export const formatYear = (year: number): string => {
    return `${year}-${year + 1}`;
};

export const formatSemester = (semester: number): string => {
    if (semester === 0) return 'Рік';
    return `${semester} семестр`;
};

export const getDefaultDepartment = (workloads: EvaluationWorkload[]): string => {
    if (workloads.length === 0) return '';
    const departments = Array.from(new Set(workloads.map((w) => w.subdivision?.bravoId).filter(Boolean)));
    return departments.length > 0 ? departments[0].toString() : '';
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
    const yearRanges = Object.keys(workloadsByYearRange).sort((a, b) => {
        const aStart = parseInt(a.split('-')[0]);
        const bStart = parseInt(b.split('-')[0]);
        return bStart - aStart;
    });

    return yearRanges.map((range) => ({
        value: range,
        label: range,
    }));
};

export const getDefaultYearFromGrouped = (workloadsByYearRange: Record<string, EvaluationWorkload[]>): string => {
    const yearRanges = Object.keys(workloadsByYearRange);
    if (yearRanges.length === 0) return '';

    const sortedRanges = yearRanges.sort((a, b) => {
        const aStart = parseInt(a.split('-')[0]);
        const bStart = parseInt(b.split('-')[0]);
        return bStart - aStart;
    });

    return sortedRanges[0];
};

export const filterWorkloadsByPeriod = (
    workloads: EvaluationWorkload[],
    selectedPeriod: string,
    selectedSubdivision: string
): EvaluationWorkload[] => {
    if (selectedPeriod !== '0') {
        return workloads.filter((w) => w.semester.toString() === selectedPeriod);
    }

    if (selectedSubdivision !== 'all') {
        return workloads.filter((w) => w.subdivision?.bravoId.toString() === selectedSubdivision);
    }

    return workloads;
};

export const getSalaryLabel = (salary: number) => {
    if (salary === 1) {
        return "Повна ставка"
    }

    return `${salary} ставки`
}

export const getHighestSalaryLabel = (workloads: EvaluationWorkload[]): string => {
    const highestSalary = workloads.toSorted((a, b) => b.salary - a.salary)[0].salary;
    return getSalaryLabel(parseFloat(highestSalary.toFixed(2)));
}

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