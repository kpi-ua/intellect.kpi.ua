import { EvaluationWorkload, Position } from '@/types/intellect';
import React, { FC } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useLabelColor } from '@/components/JobLabel/useLabelColor';

interface Props {
    position: Position;
    workloads: EvaluationWorkload[];
}

export const JobLabel: FC<Props> = ({ position, workloads }) => {
    const {backgroundColor, textColor} = useLabelColor(position, workloads);

    return (
        <div className="inline-block">
            <div
                className={`text-white ${backgroundColor} rounded-lg p-0.5 pl-2 flex gap-2 items-center text-xs whitespace-nowrap`}
            >
                {position.name}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className={`${textColor} rounded-md p-1 bg-white w-full text-center min-w-[32px]`}>
                            {position.subdivision.abbreviation}
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
