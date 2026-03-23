import React from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EvaluationWorkload } from '@/types/intellect';
import { formatYearShort, formatSemester } from './utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useGroupedWorkloads } from './useGroupedWorkloads';

interface Props {
    hideTitle?: boolean;
    workloads: EvaluationWorkload[];
    selectedPeriod: string;
}

export const DataTable = ({ workloads, selectedPeriod, hideTitle }: Props) => {

    const allGroupedWorkloads = useGroupedWorkloads(workloads, selectedPeriod);

    const groupedWorkloads = React.useMemo(() => {
        return allGroupedWorkloads.filter(g => g.normative);
    }, [allGroupedWorkloads]);

    const renderValueCell = (value: number, isBold: boolean) => (
        <TableCell className={isBold ? "font-bold text-right" : "text-right"}>{value.toFixed(2)}</TableCell>
    );

    const renderMixedCell = (normativeValue: number, isBold: boolean, hourlyValue?: number) => {
        if (!normativeValue && !hourlyValue) {
            return <TableCell className={isBold ? "font-bold text-right" : "text-right"}>0.00</TableCell>;
        }

        if (hourlyValue && hourlyValue > 0) {
            return (
                <TableCell className={`whitespace-nowrap flex flex-col text-right ${isBold ? "font-bold" : "font-semibold"}`}>
                    {(normativeValue || 0).toFixed(2)}<span className="font-medium text-sm text-neutral-500">+ {hourlyValue.toFixed(2)} пог.</span>
                </TableCell>
            );
        }

        return <TableCell className={isBold ? "font-bold text-right" : "font-medium text-right"}>{(normativeValue || 0).toFixed(2)}</TableCell>;
    };

    return (
        <>
            {!hideTitle && (
                <SectionTitle className="mb-4 uppercase text-primary">Деталізація навантаження</SectionTitle>
            )}
            <div className="w-full overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Навч. рік</TableHead>
                            <TableHead>Семестр</TableHead>
                            <TableHead>Підрозділ</TableHead>
                            <TableHead className="bg-[#1C396E] text-white text-right ">Навчальне</TableHead>
                            <TableHead className="bg-[#2D5A9E] text-white text-right">Наукове</TableHead>
                            <TableHead className="bg-[#4A7AC7] text-white text-right">Методичне</TableHead>
                            <TableHead className="bg-[#7BA3E0] text-black text-right">Організаційне</TableHead>
                            <TableHead className="bg-[#B0C9F0] text-black text-right">Інше</TableHead>
                            <TableHead className="text-right">Всього</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {groupedWorkloads.map((group, idx) => {
                            const workload = group.normative!;
                            const isTotalsRow = workload.semester === 0;
                            return (
                                <TableRow
                                    key={`${workload.year}-${workload.semester}-${workload.subdivision?.bravoId || idx}`}
                                    className={isTotalsRow ? "bg-slate-50/80" : ""}
                                >
                                    <TableCell>{formatYearShort(workload.year)}</TableCell>
                                    <TableCell>{formatSemester(workload.semester)}</TableCell>
                                    <TableCell>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="underline cursor-help">
                                                    Кафедра {workload.subdivision.abbreviation}
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{workload.subdivision?.name}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TableCell>

                                    {renderMixedCell(workload.educational, isTotalsRow, group.hourly?.educational)}
                                    {renderValueCell(workload.scientific, isTotalsRow)}
                                    {renderValueCell(workload.methodical, isTotalsRow)}
                                    {renderValueCell(workload.organizational, isTotalsRow)}
                                    {renderValueCell(workload.other, isTotalsRow)}
                                    {renderMixedCell(workload.totalWorkload, isTotalsRow, group.hourly?.totalWorkload)}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};
