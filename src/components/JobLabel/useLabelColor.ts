import { EvaluationWorkload, Position } from '@/types/intellect';

export const useLabelColor = (position: Position, workloads: EvaluationWorkload[]) => {
    const relevantWorkloads = workloads?.filter((w) => w.subdivision.bravoId === position.subdivision.bravoId) || [];

    const latest = relevantWorkloads.reduce(
        (acc, curr) => {
            if (!acc || curr.year > acc.year || (curr.year === acc.year && curr.semester > acc.semester)) {
                return { year: curr.year, semester: curr.semester };
            }
            return acc;
        },
        null as { year: number; semester: number } | null
    );

    let backgroundColor = 'bg-primary';
    let textColor = 'text-primary';

    if (latest) {
        const currentWorkloads = relevantWorkloads.filter(
            (w) => w.year === latest.year && w.semester === latest.semester
        );

        const totalSalary = currentWorkloads.reduce((sum, w) => sum + w.salary, 0);
        const totalEducational = currentWorkloads.reduce((sum, w) => sum + w.educational, 0);

        if (totalSalary === 1) {
            backgroundColor = 'bg-primary';
            textColor = 'text-primary';
        } else if (totalSalary > 0 && totalSalary < 1) {
            backgroundColor = 'bg-green-600';
            textColor = 'text-green-600';
        } else if (totalSalary === 0 && totalEducational > 0) {
            backgroundColor = 'bg-pink-600';
            textColor = 'text-pink-600';
        }
    }
    return { backgroundColor, textColor };
};