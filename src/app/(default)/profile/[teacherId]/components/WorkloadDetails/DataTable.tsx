import React from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EvaluationWorkload } from '@/types/intellect';
import { formatYear, formatSemester } from './utils';

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
                            <TableRow key={`${workload.year}-${workload.semester}-${workload.department?.id || idx}`}>
                                <TableCell>{formatYear(workload.year)}</TableCell>
                                <TableCell>{formatSemester(workload.semester)}</TableCell>
                                <TableCell>{workload.department?.name || '-'}</TableCell>
                                <TableCell style={{ backgroundColor: '#1C396E', color: 'white' }}>
                                    {workload.educational.toFixed(2)}
                                </TableCell>
                                <TableCell style={{ backgroundColor: '#2D5A9E', color: 'white' }}>
                                    {workload.scientific.toFixed(2)}
                                </TableCell>
                                <TableCell style={{ backgroundColor: '#4A7AC7', color: 'white' }}>
                                    {workload.methodical.toFixed(2)}
                                </TableCell>
                                <TableCell style={{ backgroundColor: '#7BA3E0', color: 'white' }}>
                                    {workload.organizational.toFixed(2)}
                                </TableCell>
                                <TableCell style={{ backgroundColor: '#B0C9F0', color: 'white' }}>
                                    {workload.other.toFixed(2)}
                                </TableCell>
                                <TableCell className="font-semibold">{workload.totalWorkload.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};
