import React from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EvaluationWorkload } from '@/types/intellect';
import { formatYearShort, formatSemester } from './utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useGroupedWorkloads } from './useGroupedWorkloads';

import { WorkloadGroupType } from './useGroupedWorkloads';

interface Props {
    hideTitle?: boolean;
    groupedWorkloads: WorkloadGroupType[];
}

export const HourlyDataTable = ({ groupedWorkloads, hideTitle }: Props) => {

    const workloads = React.useMemo(() => {
        return groupedWorkloads
            .filter((g) => g.hourly)
            .map((g) => g.hourly!);
    }, [groupedWorkloads]);

    const renderValueCell = (value: number, isBold: boolean) => (
        <TableCell className={isBold ? "font-bold text-right" : "text-right"}>{value.toFixed(2)}</TableCell>
    );

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
                            <TableHead className="bg-[#1C396E] text-white text-right">Навчальне</TableHead>
                            <TableHead className="text-right">Всього</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workloads.map((workload, idx) => {
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
                                                    {workload.subdivision.abbreviation}
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{workload.subdivision?.name}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TableCell>

                                    {renderValueCell(workload.educational, isTotalsRow)}
                                    {renderValueCell(workload.totalWorkload, isTotalsRow)}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};
