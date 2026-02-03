'use client';

import React, { useMemo } from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { EvaluationWorkload } from '@/types/intellect';

interface Props {
    workloads: EvaluationWorkload[];
    yearRange: string;
    selectedYear: string;
}

export const StackedBarChart = ({ workloads, yearRange, selectedYear }: Props) => {
    const workloadSummary = useMemo(() => {
        const totals = workloads.reduce(
            (acc, workload) => ({
                educational: acc.educational + (workload.educational || 0),
                scientific: acc.scientific + (workload.scientific || 0),
                methodical: acc.methodical + (workload.methodical || 0),
                organizational: acc.organizational + (workload.organizational || 0),
                other: acc.other + (workload.other || 0),
                totalHours: acc.totalHours + (workload.totalHours || 0),
            }),
            { educational: 0, scientific: 0, methodical: 0, organizational: 0, other: 0, totalHours: 0 }
        );

        const total = totals.educational + totals.scientific + totals.methodical + totals.organizational + totals.other;

        return {
            ...totals,
            percentages: {
                educational: total > 0 ? (totals.educational / total) * 100 : 0,
                scientific: total > 0 ? (totals.scientific / total) * 100 : 0,
                methodical: total > 0 ? (totals.methodical / total) * 100 : 0,
                organizational: total > 0 ? (totals.organizational / total) * 100 : 0,
                other: total > 0 ? (totals.other / total) * 100 : 0,
            },
        };
    }, [workloads]);

    const thours = workloads.find((w) => w.year === Number(selectedYear))?.totalHours;
    console.log('thours', thours);

    return (
        <div className="mt-8">
            <SectionTitle className="mb-4 uppercase text-primary">
                ВИКОНАННЯ НОРМИ: {yearRange} (ПОВНА СТАВКИ)
            </SectionTitle>
            <div className="relative">
                <div className="flex overflow-hidden rounded-md h-12">
                    {workloadSummary.percentages.educational > 0 && (
                        <div
                            style={{
                                width: `${workloadSummary.percentages.educational}%`,
                                backgroundColor: '#1C396E',
                            }}
                        />
                    )}
                    {workloadSummary.percentages.scientific > 0 && (
                        <div
                            style={{
                                width: `${workloadSummary.percentages.scientific}%`,
                                backgroundColor: '#2D5A9E',
                            }}
                        />
                    )}
                    {workloadSummary.percentages.methodical > 0 && (
                        <div
                            style={{
                                width: `${workloadSummary.percentages.methodical}%`,
                                backgroundColor: '#4A7AC7',
                            }}
                        />
                    )}
                    {workloadSummary.percentages.organizational > 0 && (
                        <div
                            style={{
                                width: `${workloadSummary.percentages.organizational}%`,
                                backgroundColor: '#7BA3E0',
                            }}
                        />
                    )}
                    {workloadSummary.percentages.other > 0 && (
                        <div
                            style={{
                                width: `${workloadSummary.percentages.other}%`,
                                backgroundColor: '#B0C9F0',
                            }}
                        />
                    )}
                </div>
                <div className="mt-2 text-right text-sm font-semibold text-neutral-700">
                    {thours?.toFixed(2)} год
                </div>
            </div>

            {/* Legend */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-2">
                    <div
                        className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0"
                        style={{ backgroundColor: '#1C396E' }}
                    ></div>
                    <div className="text-sm">
                        <div className="font-medium" style={{ color: '#000000' }}>
                            Навчальна
                        </div>
                        <div className="mt-0.5">
                            <span style={{ color: '#6A7282' }}>{Math.round(workloadSummary.educational)} год</span>
                            <span style={{ color: '#99A1AF' }}>
                                {' '}
                                ({workloadSummary.percentages.educational.toFixed(2)}%)
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <div
                        className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0"
                        style={{ backgroundColor: '#2D5A9E' }}
                    ></div>
                    <div className="text-sm">
                        <div className="font-medium" style={{ color: '#000000' }}>
                            Наукова
                        </div>
                        <div className="mt-0.5">
                            <span style={{ color: '#6A7282' }}>{Math.round(workloadSummary.scientific)} год</span>
                            <span style={{ color: '#99A1AF' }}>
                                {' '}
                                ({workloadSummary.percentages.scientific.toFixed(2)}%)
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <div
                        className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0"
                        style={{ backgroundColor: '#4A7AC7' }}
                    ></div>
                    <div className="text-sm">
                        <div className="font-medium" style={{ color: '#000000' }}>
                            Методична
                        </div>
                        <div className="mt-0.5">
                            <span style={{ color: '#6A7282' }}>{Math.round(workloadSummary.methodical)} год</span>
                            <span style={{ color: '#99A1AF' }}>
                                {' '}
                                ({workloadSummary.percentages.methodical.toFixed(2)}%)
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <div
                        className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0"
                        style={{ backgroundColor: '#7BA3E0' }}
                    ></div>
                    <div className="text-sm">
                        <div className="font-medium" style={{ color: '#000000' }}>
                            Організаційна
                        </div>
                        <div className="mt-0.5">
                            <span style={{ color: '#6A7282' }}>{Math.round(workloadSummary.organizational)} год</span>
                            <span style={{ color: '#99A1AF' }}>
                                {' '}
                                ({workloadSummary.percentages.organizational.toFixed(2)}%)
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <div
                        className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0"
                        style={{ backgroundColor: '#B0C9F0' }}
                    ></div>
                    <div className="text-sm">
                        <div className="font-medium" style={{ color: '#000000' }}>
                            Інше
                        </div>
                        <div className="mt-0.5">
                            <span style={{ color: '#6A7282' }}>{Math.round(workloadSummary.other)} год</span>
                            <span style={{ color: '#99A1AF' }}> ({workloadSummary.percentages.other.toFixed(2)}%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
