import { useMemo } from 'react';
import { EvaluationWorkload } from '@/types/intellect';

export type WorkloadGroupType = { normative?: EvaluationWorkload; hourly?: EvaluationWorkload };

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
            } else {
                if (!semGroup.normative) semGroup.normative = { ...w };
                else accumulate(semGroup.normative, w);

                if (!group.total.normative) group.total.normative = { ...w, semester: 0 };
                else accumulate(group.total.normative, w);
            }
        });

        const result: WorkloadGroupType[] = [];

        for (const key in subgroups) {
            const group = subgroups[key];
            const semKeys = Object.keys(group.semesters).map(Number).sort((a, b) => a - b);
            semKeys.forEach((sem) => {
                const sGroup = group.semesters[sem];
                if (sGroup.normative || sGroup.hourly) {
                    result.push(sGroup);
                }
            });

            if (selectedPeriod === '0') {
                if (group.total.normative || group.total.hourly) {
                    result.push(group.total);
                }
            }
        }

        return result;
    }, [workloads, selectedPeriod]);
};
