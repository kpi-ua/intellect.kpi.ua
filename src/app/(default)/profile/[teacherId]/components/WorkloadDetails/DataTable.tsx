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
                            <TableHead>Навчальна</TableHead>
                            <TableHead>Наукова</TableHead>
                            <TableHead>Методична</TableHead>
                            <TableHead>Організаційна</TableHead>
                            <TableHead>Інше</TableHead>
                            <TableHead>Всього</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workloads.map((workload, idx) => (
                            <TableRow key={`${workload.year}-${workload.semester}-${workload.subdivision?.id || idx}`}>
                                <TableCell>{formatYear(workload.year)}</TableCell>
                                <TableCell>{formatSemester(workload.semester)}</TableCell>
                                <TableCell>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span>{workload.subdivisionAbbreviation}</span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{workload.subdivision?.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="bg-[#1C396E] text-white">
                                    {workload.educational.toFixed(2)}
                                </TableCell>
                                <TableCell className="bg-[#2D5A9E] text-white">
                                    {workload.scientific.toFixed(2)}
                                </TableCell>
                                <TableCell className="bg-[#4A7AC7] text-white">
                                    {workload.methodical.toFixed(2)}
                                </TableCell>
                                <TableCell className="bg-[#7BA3E0]">{workload.organizational.toFixed(2)}</TableCell>
                                <TableCell className="bg-[#B0C9F0]">{workload.other.toFixed(2)}</TableCell>
                                <TableCell className="font-semibold">{workload.totalWorkload.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};
