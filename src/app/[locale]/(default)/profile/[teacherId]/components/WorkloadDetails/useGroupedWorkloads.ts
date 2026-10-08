import { useMemo } from 'react';
import { EmploymentType, EvaluationWorkload } from '@/types/intellect';
import { getAnnualCapAdjustments } from './workloadCaps';

export const WORKLOAD_BUCKET = {
    normative: 'normative',
    mixed: 'mixed',
    hourly: 'hourly',
} as const;

export type WorkloadBucket = (typeof WORKLOAD_BUCKET)[keyof typeof WORKLOAD_BUCKET];

export type DisplayWorkload = EvaluationWorkload & {
    rawScientific?: number;
    rawOther?: number;
};
export type WorkloadGroupType = Partial<Record<WorkloadBucket, DisplayWorkload>>;

/**
 * Buckets a workload row by its employment form: primary appointment (normative),
 * secondary appointment (mixed) or hourly. Rows cached before the API exposed a
 * usable employment value fall back to the old salary-based heuristic.
 */
export const getWorkloadBucket = (w: EvaluationWorkload): WorkloadBucket => {
    switch (w.employment) {
        case EmploymentType.FullTime:
            return WORKLOAD_BUCKET.normative;
        case EmploymentType.PartTime:
        case EmploymentType.PartTimeInternal:
        case EmploymentType.PartTimeExternal:
            return WORKLOAD_BUCKET.mixed;
        case EmploymentType.HourlyPay:
            return WORKLOAD_BUCKET.hourly;
        default:
            if (w.salary === 0) return WORKLOAD_BUCKET.hourly;
            return w.salary >= 1 ? WORKLOAD_BUCKET.normative : WORKLOAD_BUCKET.mixed;
    }
};

export const useGroupedWorkloads = (workloads: EvaluationWorkload[], selectedPeriod: string) => {
    return useMemo(() => {
        const subgroups: Record<
            string,
            {
                year: number;
                subdivision: EvaluationWorkload['subdivision'];
                semesters: Record<number, WorkloadGroupType>;
                total: WorkloadGroupType;
            }
        > = {};

        const accumulate = (target: EvaluationWorkload, source: EvaluationWorkload) => {
            target.educational += source.educational;
            target.scientific += source.scientific;
            target.methodical += source.methodical;
            target.organizational += source.organizational;
            target.other += source.other;
            target.totalWorkload += source.totalWorkload;
        };

        workloads.forEach((w) => {
            if (w.semester === 0) return;

            const key = `${w.year}-${w.subdivision?.bravoId || 'no-sub'}`;
            if (!subgroups[key]) {
                subgroups[key] = {
                    year: w.year,
                    subdivision: w.subdivision,
                    semesters: {},
                    total: {},
                };
            }
            const group = subgroups[key];

            if (!group.semesters[w.semester]) group.semesters[w.semester] = {};
            const semGroup = group.semesters[w.semester];

            const bucket = getWorkloadBucket(w);

            const semesterWorkload = semGroup[bucket];
            if (semesterWorkload) accumulate(semesterWorkload, w);
            else semGroup[bucket] = { ...w };

            const totalWorkload = group.total[bucket];
            if (totalWorkload) accumulate(totalWorkload, w);
            else group.total[bucket] = { ...w, semester: 0 };
        });

        Object.values(subgroups).forEach((group) => {
            const semesterGroups = Object.values(group.semesters);

            Object.values(WORKLOAD_BUCKET).forEach((workloadType) => {
                const total = group.total[workloadType];
                if (!total) return;

                const salaries = semesterGroups
                    .map((semesterGroup) => semesterGroup[workloadType]?.salary)
                    .filter((salary): salary is number => salary !== undefined);

                if (salaries.length > 0) {
                    total.salary = salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length;
                }

                const rows = workloads.filter(
                    (w) =>
                        w.semester > 0 &&
                        w.year === group.year &&
                        w.subdivision?.bravoId === group.subdivision?.bravoId &&
                        getWorkloadBucket(w) === workloadType
                );
                const adjustments = getAnnualCapAdjustments(rows);
                total.rawScientific = total.scientific;
                total.rawOther = total.other;
                total.scientific -= adjustments.scientific;
                total.other -= adjustments.other;
                total.totalWorkload -= adjustments.scientific + adjustments.other;
            });
        });

        const result: WorkloadGroupType[] = [];

        for (const key in subgroups) {
            const group = subgroups[key];
            const semKeys = Object.keys(group.semesters)
                .map(Number)
                .sort((a, b) => a - b);
            semKeys.forEach((sem: number) => {
                const sGroup = group.semesters[sem];
                if (sGroup.normative) {
                    result.push({ normative: sGroup.normative, hourly: sGroup.hourly });
                    if (sGroup.mixed) {
                        result.push({ mixed: sGroup.mixed });
                    }
                } else if (sGroup.mixed) {
                    result.push({ mixed: sGroup.mixed, hourly: sGroup.hourly });
                } else if (sGroup.hourly) {
                    result.push({ hourly: sGroup.hourly });
                }
            });

            if (selectedPeriod === '0') {
                if (group.total.normative) {
                    result.push({ normative: group.total.normative, hourly: group.total.hourly });
                    if (group.total.mixed) {
                        result.push({ mixed: group.total.mixed });
                    }
                } else if (group.total.mixed) {
                    result.push({ mixed: group.total.mixed, hourly: group.total.hourly });
                } else if (group.total.hourly) {
                    result.push({ hourly: group.total.hourly });
                }
            }
        }

        return result;
    }, [workloads, selectedPeriod]);
};
