import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import React from 'react';

interface Props {
    color: string;
    percentage: number;
    hours: number;
}

export const BarSegment = ({ color, percentage, hours }: Props) => {
    if (percentage <= 0) return null;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div style={{ width: `${percentage}%`, backgroundColor: color }} />
            </TooltipTrigger>
            <TooltipContent>
                <p>{hours.toFixed(2)}</p>
            </TooltipContent>
        </Tooltip>
    );
};