import React from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EvaluationWorkload } from '@/types/intellect';
import { formatYear, formatSemester } from './utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface Props {
    workloads: EvaluationWorkload[];
}

export const DataTable = ({ workloads }: Props) => {
    const groupedWorkloads = React.useMemo(() => {
        const groups: Record<string, { main?: EvaluationWorkload; hourly?: EvaluationWorkload }> = {};

        workloads.forEach((w) => {
            const key = `${w.year}-${w.semester}-${w.subdivision?.id || 'no-sub'}`;
            if (!groups[key]) {
                groups[key] = {};
            }

            if (w.salary === 0) {
                if (!groups[key].hourly) {
                    groups[key].hourly = { ...w };
                } else {
                    const h = groups[key].hourly!;
                    h.educational += w.educational;
                    h.scientific += w.scientific;
                    h.methodical += w.methodical;
                    h.organizational += w.organizational;
                    h.other += w.other;
                    h.totalWorkload += w.totalWorkload;
                }
            } else {
                if (!groups[key].main) {
                    groups[key].main = { ...w };
                } else {
                    const m = groups[key].main!;
                    m.educational += w.educational;
                    m.scientific += w.scientific;
                    m.methodical += w.methodical;
                    m.organizational += w.organizational;
                    m.other += w.other;
                    m.totalWorkload += w.totalWorkload;
                }
            }
        });

        return Object.values(groups);
    }, [workloads]);

    const renderCell = (mainValue?: number, hourlyValue?: number) => {
        const main = mainValue || 0;
        const hourly = hourlyValue || 0;

        if (main === 0 && hourly === 0) return <TableCell className="font-bold">0.00</TableCell>;

        return (
            <TableCell>
                <div className="flex flex-col">
                    <span className="font-bold">{main.toFixed(2)}</span>
                    {hourly > 0 && (
                        <span className="text-xs font-normal text-muted-foreground">+{hourly.toFixed(2)} пог.</span>
                    )}
                </div>
            </TableCell>
        );
    };

    return (
        <>
            <SectionTitle className="mb-4 uppercase text-primary">Деталізація навантаження</SectionTitle>
            <div className="w-full overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Навч. рік</TableHead>
                            <TableHead>Семестр</TableHead>
                            <TableHead>Підрозділ</TableHead>
                            <TableHead className="bg-[#1C396E] text-white">Навчальна</TableHead>
                            <TableHead className="bg-[#2D5A9E] text-white">Наукова</TableHead>
                            <TableHead className="bg-[#4A7AC7] text-white">Методична</TableHead>
                            <TableHead className="bg-[#7BA3E0] text-black">Організаційна</TableHead>
                            <TableHead className="bg-[#B0C9F0] text-black">Інше</TableHead>
                            <TableHead>Всього</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {groupedWorkloads.map((group, idx) => {
                            const workload = group.main || group.hourly!;
                            return (
                                <TableRow key={`${workload.year}-${workload.semester}-${workload.subdivision?.id || idx}`}>
                                    <TableCell>{formatYear(workload.year)}</TableCell>
                                    <TableCell>{formatSemester(workload.semester)}</TableCell>
                                    <TableCell>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="underline cursor-help">
                                                    {workload.subdivisionAbbreviation}
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{workload.subdivision?.name}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TableCell>
                                    {renderCell(group.main?.educational, group.hourly?.educational)}
                                    {renderCell(group.main?.scientific, group.hourly?.scientific)}
                                    {renderCell(group.main?.methodical, group.hourly?.methodical)}
                                    {renderCell(group.main?.organizational, group.hourly?.organizational)}
                                    {renderCell(group.main?.other, group.hourly?.other)}
                                    {renderCell(
                                        (group.main?.totalWorkload || 0) + (group.hourly?.totalWorkload || 0),
                                    )}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};
