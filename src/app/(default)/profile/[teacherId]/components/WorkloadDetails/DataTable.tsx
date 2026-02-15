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
                            <TableHead className="bg-[#1C396E] text-white">Навчальна</TableHead>
                            <TableHead className="bg-[#2D5A9E] text-white">Наукова</TableHead>
                            <TableHead className="bg-[#4A7AC7] text-white">Методична</TableHead>
                            <TableHead className="bg-[#7BA3E0] text-black">Організаційна</TableHead>
                            <TableHead className="bg-[#B0C9F0] text-black">Інше</TableHead>
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
                                            <span className="underline">{workload.subdivisionAbbreviation}</span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{workload.subdivision?.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>{workload.educational.toFixed(2)}</TableCell>
                                <TableCell>{workload.scientific.toFixed(2)}</TableCell>
                                <TableCell>{workload.methodical.toFixed(2)}</TableCell>
                                <TableCell>{workload.organizational.toFixed(2)}</TableCell>
                                <TableCell>{workload.other.toFixed(2)}</TableCell>
                                <TableCell className="font-semibold">{workload.totalWorkload.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};
