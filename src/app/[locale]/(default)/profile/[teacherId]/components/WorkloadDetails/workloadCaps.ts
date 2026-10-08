import type { EvaluationWorkload } from '@/types/intellect';

/** Annual results are repeated on each semester row; count each profile only once.
 * Use the API's allocation, which is shared with K-7, rather than recapping a
 * filtered department or employment bucket independently.
 */
export const getAnnualCapAdjustments = (workloads: EvaluationWorkload[]) => {
    const seen = new Set<string>();
    const adjustments = { scientific: 0, other: 0 };
    for (const workload of workloads) {
        const key = JSON.stringify([
            workload.employeeId,
            workload.year,
            workload.subdivision?.bravoId,
            workload.subdivisionAbbreviation,
            workload.workOrgFormId,
        ]);
        if (seen.has(key)) continue;
        seen.add(key);
        adjustments.scientific += workload.scientificWorkCap?.exceededHours ?? 0;
        adjustments.other += workload.otherWorkCap?.exceededHours ?? 0;
    }
    return adjustments;
};
