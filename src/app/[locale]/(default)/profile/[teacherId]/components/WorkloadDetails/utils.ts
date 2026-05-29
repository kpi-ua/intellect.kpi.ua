import { EmploymentType, EvaluationWorkload, Position } from '@/types/intellect';
import {
    WorkloadCategory,
    WorkloadSummary,
    WorkloadTotals,
} from './types';
import {
    WorkloadGroupType
} from '@/app/[locale]/(default)/profile/[teacherId]/components/WorkloadDetails/useGroupedWorkloads';
import {
    EMPLOYMENT_ABBREVIATION
} from '@/app/[locale]/(default)/profile/[teacherId]/components/WorkloadDetails/constants';

export const formatYear = (year: number): string => {
    return `${year}-${year + 1}`;
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

/**
 * Finds the employment abbreviation (PA/SA/HA) for a given subdivision bravoId
 * by looking it up in the teacher's positions list.
 */
export const getEmploymentAbbreviation = (positions: Position[], bravoId: number | undefined): string => {
    if (!bravoId) return '';
    const match = positions.find((p) => p.subdivision?.bravoId === bravoId);
    if (!match) return '';
    return EMPLOYMENT_ABBREVIATION[match.employment] ?? '';
};

/**
 * Extracts the subdivision bravoId from the first available workload in a grouped section.
 */
export const getSectionBravoId = (grouped: WorkloadGroupType[]): number | undefined => {
    for (const g of grouped) {
        const workload = g.normative ?? g.mixed ?? g.hourly;
        if (workload?.subdivision?.bravoId) return workload.subdivision.bravoId;
    }
    return undefined;
};

/**
 * Returns the EmploymentType enum key for a given subdivision bravoId,
 * used to look up the full translated label via t('employment_types.{key}').
 */
export const getSectionEmploymentType = (positions: Position[], bravoId: number | undefined): EmploymentType => {
    if (!bravoId) return EmploymentType.Unknown;
    const match = positions.find((p) => p.subdivision?.bravoId === bravoId);
    return match?.employment ?? EmploymentType.Unknown;
};