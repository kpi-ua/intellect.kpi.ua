export type WorkloadCategory = 'educational' | 'scientific' | 'methodical' | 'organizational' | 'other';
export type WorkloadTotals = Record<WorkloadCategory, number>;
export type WorkloadSummary = WorkloadTotals & {
    percentages: WorkloadTotals;
};