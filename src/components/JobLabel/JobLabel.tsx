import React, { FC } from 'react';

interface Props {
    qualification: string;
    workplace: string;
}

export const JobLabel: FC<Props> = ({ qualification, workplace }) => {
    return (
        <div className="inline-block">
            <div className="text-white bg-primary rounded-lg p-0.5 pl-2 flex gap-2 items-center text-xs whitespace-nowrap">
                {qualification}
                <div className="text-primary rounded-md p-1 bg-white w-full">{workplace}</div>
            </div>
        </div>
    );
};
