import React from 'react';

type Props = {
    qualification: string;
    workplace: string;
};

const JobLabel: React.FC<Props> = ({ qualification, workplace }) => {
    return (
        <div className="inline-block">
            <div className="flex text-white bg-primary rounded-lg p-0.5 pl-2 flex gap-2 items-center whitespace-nowrap text-xs">
                {qualification}
                <div className="text-primary rounded-md p-1 bg-white w-full">{workplace}</div>
            </div>
        </div>
    );
};

export default JobLabel;
