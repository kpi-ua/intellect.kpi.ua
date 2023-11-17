import FeatherIcon from '../FeatherIcon/FeatherIcon';
import React from 'react';

type Props = {
    // TODO types for linked routes
    routePath: any[];
};

const RoutePointer: React.FC<Props> = ({ routePath = [] }) => {
    const route = routePath.map((item, idx) => {
        return (
            <div
                key={idx}
                className={
                    'flex items-center ' +
                    (idx === routePath.length - 1 ? '' : 'text-neutral-600')
                }
            >
                <a className="cursor-pointer" href={item.path}>
                    {item.label}
                </a>
                {idx !== routePath.length - 1 ? (
                    <FeatherIcon
                        width={40}
                        className="inline fill-none text-neutral-600"
                        icon="chevron-right"
                    />
                ) : (
                    ''
                )}
            </div>
        );
    });

    return <div className="flex items-center">{route}</div>;
};

export default RoutePointer;
