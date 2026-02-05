import { EvaluationWorkload } from '@/types/intellect';

export const formatYear = (year: number, semester?: number): string => {
    // Semester 1 (fall) of calendar year Y → academic year Y-(Y+1)
    // Semester 2 (spring) of calendar year Y → academic year (Y-1)-Y
    if (semester === 1) {
        return `${year}-${year + 1}`;
    } else if (semester === 2) {
        return `${year - 1}-${year}`;
    }
    // Default fallback (for semester 0 or undefined)
    return `${year}-${year + 1}`;
};

export const formatSemester = (semester: number): string => {
    if (semester === 0) return 'Рік';
    return `${semester} семестр`;
};

export const getDefaultDepartment = (workloads: EvaluationWorkload[]): string => {
    if (workloads.length === 0) return '';
    const departments = Array.from(new Set(workloads.map((w) => w.subdivision?.id).filter(Boolean)));
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
        const academicYearRange = formatYear(workload.year, workload.semester);
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
        return workloads.filter((w) => w.subdivision?.id.toString() === selectedSubdivision);
    }

    return workloads;
};
