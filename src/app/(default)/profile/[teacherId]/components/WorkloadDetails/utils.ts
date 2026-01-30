import { EvaluationWorkload } from '@/types/intellect';

export const formatYear = (year: number): string => {
    return `${year}-${year + 1}`;
};

export const formatSemester = (semester: number): string => {
    if (semester === 0) return 'Рік';
    return `${semester} семестр`;
};

export const getDefaultYear = (workloads: EvaluationWorkload[]): string => {
    if (workloads.length === 0) return '';
    const years = Array.from(new Set(workloads.map((w) => w.year))).sort((a, b) => b - a);
    return years.length > 0 ? years[0].toString() : '';
};

export const getDefaultPeriod = (workloads: EvaluationWorkload[]): string => {
    if (workloads.length === 0) return '';
    const periods = Array.from(new Set(workloads.map((w) => w.semester))).sort();
    // Prefer "Рік" (0) if semester 1 or 2 exists, otherwise use the first available period
    if (periods.includes(1) || periods.includes(2)) return '0';
    return periods.length > 0 ? periods[0].toString() : '';
};

export const getDefaultDepartment = (workloads: EvaluationWorkload[]): string => {
    if (workloads.length === 0) return '';
    const departments = Array.from(new Set(workloads.map((w) => w.department?.id).filter(Boolean)));
    return departments.length > 0 ? departments[0].toString() : '';
};
