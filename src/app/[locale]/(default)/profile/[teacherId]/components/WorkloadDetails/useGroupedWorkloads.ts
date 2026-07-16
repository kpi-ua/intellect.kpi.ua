import { useMemo } from 'react';
import { EvaluationWorkload } from '@/types/intellect';

export type WorkloadGroupType = { normative?: EvaluationWorkload; mixed?: EvaluationWorkload; hourly?: EvaluationWorkload };

export const useGroupedWorkloads = (workloads: EvaluationWorkload[], selectedPeriod: string) => {
    return useMemo(() => {
        const subgroups: Record<string, {
            year: number;
            subdivision: EvaluationWorkload['subdivision'];
            semesters: Record<number, WorkloadGroupType>;
            total: WorkloadGroupType;
        }> = {};

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

            if (w.salary === 0) {
                if (!semGroup.hourly) semGroup.hourly = { ...w };
                else accumulate(semGroup.hourly, w);

                if (!group.total.hourly) group.total.hourly = { ...w, semester: 0 };
                else accumulate(group.total.hourly, w);
            } else if (w.salary >= 1) {
                if (!semGroup.normative) semGroup.normative = { ...w };
                else accumulate(semGroup.normative, w);

                if (!group.total.normative) group.total.normative = { ...w, semester: 0 };
                else accumulate(group.total.normative, w);
            } else {
                if (!semGroup.mixed) semGroup.mixed = { ...w };
                else accumulate(semGroup.mixed, w);

                if (!group.total.mixed) group.total.mixed = { ...w, semester: 0 };
                else accumulate(group.total.mixed, w);
            }
        });

        Object.values(subgroups).forEach((group) => {
            const semesterGroups = Object.values(group.semesters);

            (['normative', 'mixed', 'hourly'] as const).forEach((workloadType) => {
                const total = group.total[workloadType];
                if (!total) return;

                const salaries = semesterGroups
                    .map((semesterGroup) => semesterGroup[workloadType]?.salary)
                    .filter((salary): salary is number => salary !== undefined);

                if (salaries.length > 0) {
                    total.salary = salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length;
                }
            });
        });

        const result: WorkloadGroupType[] = [];

        for (const key in subgroups) {
            const group = subgroups[key];
            const semKeys = Object.keys(group.semesters).map(Number).sort((a, b) => a - b);
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
