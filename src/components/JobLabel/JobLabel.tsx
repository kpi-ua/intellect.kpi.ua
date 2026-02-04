import { Position } from '@/types/intellect';
import React, { FC } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface Props {
    position: Position;
}

export const JobLabel: FC<Props> = ({ position }) => {
    return (
        <div className="inline-block">
            <div className="text-white bg-primary rounded-lg p-0.5 pl-2 flex gap-2 items-center text-xs whitespace-nowrap">
                {position.name}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="text-primary rounded-md p-1 bg-white w-full">
                            {position.subdivisionAbbreviation}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{position.subdivision.name}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
};
