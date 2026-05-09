import React from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatYear } from './utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { WorkloadGroupType } from './useGroupedWorkloads';
import { useTranslations } from 'next-intl';
import { CircleQuestionMark } from 'lucide-react';

interface Props {
    hideTitle?: boolean;
    groupedWorkloads: WorkloadGroupType[];
    variant?: 'normative' | 'mixed' | 'hourly';
}

export const DataTable = ({ groupedWorkloads, hideTitle, variant = 'normative' }: Props) => {
    console.log(groupedWorkloads);

    const t = useTranslations('profile.workload.table');
    const filterT = useTranslations('profile.workload.filters');

    const formatSemesterLocal = (semester: number): string => {
        if (semester === 0) return filterT('year_full');
        return `${semester} ${t('semester')}`;
    };

    const renderValueCell = (value: number, isBold: boolean) => (
        <TableCell className={isBold ? "font-bold text-right" : "text-right"}>{value.toFixed(2)}</TableCell>
    );

    const renderTotalCell = (value: number, isBold: boolean, salary: number, hourlyValue?: number) => {
        const hasHourly = hourlyValue && hourlyValue > 0;
        return (
            <TableCell className={`whitespace-nowrap text-right ${isBold ? "font-bold" : ""}`}>
                <div className={`inline-flex items-center gap-1 ${hasHourly ? "flex-col items-end" : ""}`}>
                    <span className="inline-flex items-center gap-1">
                        {value.toFixed(2)}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <CircleQuestionMark className="inline text-neutral-400 cursor-help" width={16} height={16} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t('employment_tooltip', { value: salary })}</p>
                            </TooltipContent>
                        </Tooltip>
                    </span>
                    {hasHourly && (
                        <span className="font-medium text-sm text-neutral-500">+ {hourlyValue.toFixed(2)} {t('hourly')}</span>
                    )}
                </div>
            </TableCell>
        );
    };

    const renderMixedCell = (primaryValue: number, isBold: boolean, hourlyValue?: number) => {
        if (!primaryValue && !hourlyValue) {
            return <TableCell className={isBold ? "font-bold text-right" : "text-right"}>0.00</TableCell>;
        }

        if (hourlyValue && hourlyValue > 0) {
            return (
                <TableCell className={`whitespace-nowrap flex flex-col text-right ${isBold ? "font-bold" : "font-semibold"}`}>
                    {(primaryValue || 0).toFixed(2)}<span className="font-medium text-sm text-neutral-500">+ {hourlyValue.toFixed(2)} {t('hourly')}</span>
                </TableCell>
            );
        }

        return <TableCell className={isBold ? "font-bold text-right" : "font-medium text-right"}>{(primaryValue || 0).toFixed(2)}</TableCell>;
    };

    const workloads = React.useMemo(() => {
        return groupedWorkloads
            .filter((g) => g[variant])
            .map((g) => ({
                group: g,
                workload: g[variant]
            }));
    }, [groupedWorkloads, variant]);

    return (
        <>
            {!hideTitle && (
                <SectionTitle className="mb-4 uppercase text-primary">{t('detail_title')}</SectionTitle>
            )}
            <div className="w-full overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('year')}</TableHead>
                            <TableHead>{t('semester')}</TableHead>
                            <TableHead>{t('subdivision')}</TableHead>
                            <TableHead className="bg-[#1C396E] text-white text-right">{t('educational')}</TableHead>
                            {variant !== 'hourly' && (
                                <>
                                    <TableHead className="bg-[#2D5A9E] text-white text-right">{t('scientific')}</TableHead>
                                    <TableHead className="bg-[#4A7AC7] text-white text-right">{t('methodical')}</TableHead>
                                    <TableHead className="bg-[#7BA3E0] text-black text-right">{t('organizational')}</TableHead>
                                    <TableHead className="bg-[#B0C9F0] text-black text-right">{t('other')}</TableHead>
                                </>
                            )}
                            <TableHead className="text-right">{t('total')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workloads.map(({ group, workload }, idx) => {
                            if (!workload) {
                                return null;
                            }
                            const isTotalsRow = workload.semester === 0;
                            return (
                                <TableRow
                                    key={`${workload.year}-${workload.semester}-${workload.salary}-${workload.subdivision?.bravoId || idx}`}
                                    className={isTotalsRow ? "bg-slate-50/80" : ""}
                                >
                                    <TableCell>{formatYear(workload.year)}</TableCell>
                                    <TableCell>{formatSemesterLocal(workload.semester)}</TableCell>
                                    <TableCell>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="underline cursor-help">
                                                    {t('department_prefix')} {workload.subdivision.abbreviation}
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{workload.subdivision?.name}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TableCell>

                                    {variant === 'hourly' ? (
                                        <>
                                            {renderValueCell(workload.educational, isTotalsRow)}
                                            {renderTotalCell(workload.totalWorkload, isTotalsRow, workload.salary)}
                                        </>
                                    ) : (
                                        <>
                                            {renderMixedCell(workload.educational, isTotalsRow, group.hourly?.educational)}
                                            {renderValueCell(workload.scientific, isTotalsRow)}
                                            {renderValueCell(workload.methodical, isTotalsRow)}
                                            {renderValueCell(workload.organizational, isTotalsRow)}
                                            {renderValueCell(workload.other, isTotalsRow)}
                                            {renderTotalCell(workload.totalWorkload, isTotalsRow, workload.salary, group.hourly?.totalWorkload)}
                                        </>
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
