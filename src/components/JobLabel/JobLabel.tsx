import { EmploymentType, Position } from '@/types/intellect';
import React, { FC } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface Props {
    position: Position;
}

const COLOR_MAP: Record<EmploymentType, Record<string, string>> = {
    [EmploymentType.FullTime]: {
        backgroundColor: 'bg-primary',
        textColor: 'text-primary',
    },
    [EmploymentType.PartTimeInternal]: {
        backgroundColor: 'bg-green-600',
        textColor: 'text-green-600',
    },
    [EmploymentType.Hourly]: {
        backgroundColor: 'bg-pink-600',
        textColor: 'text-pink-600',
    },
    [EmploymentType.Unknown]: {
        backgroundColor: 'bg-primary',
        textColor: 'text-primary',
    },
};

export const JobLabel: FC<Props> = ({ position }) => {
    const { backgroundColor, textColor } = COLOR_MAP[position.employment];
    return (
        <div className="inline-block">
            <div
                className={`text-white ${backgroundColor} rounded-lg p-0.5 pl-2 flex gap-2 items-center text-xs whitespace-nowrap`}
            >
                {position.name}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className={`${textColor} rounded-md p-1 bg-white w-full`}>
                            {position.subdivisionAbbreviation}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>{position.subdivision.name}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
};
