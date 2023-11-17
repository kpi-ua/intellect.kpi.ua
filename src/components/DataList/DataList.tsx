import React, { JSX } from 'react';

type Props = {
    children: JSX.Element[] | JSX.Element;
};

const DataList: React.FC<Props> = ({ children }) => {
    const parseListItems = () => {
        const childrenCount = React.Children.count(children);

        return React.Children.map(children, (child, idx) => {
            if (child!.props['data-title']) {
                return (
                    <div
                        key={idx}
                        className={
                            'pl-6 ' +
                            (idx === childrenCount - 1 ? 'relative' : '')
                        }
                    >
                        {idx !== childrenCount - 1 && childrenCount > 1 ? (
                            <div className="w-1px bg-primary absolute top-3 left-0 bottom-0" />
                        ) : null}
                        {idx === childrenCount - 1 ? (
                            <div className="w-1 -translate-x-1/2 bg-white absolute top-3 left-0 bottom-0" />
                        ) : null}
                        {childrenCount !== 1 ? (
                            <div className="relative">
                                <div className="w-5px h-5px rounded-full bg-primary absolute top-[10px] -left-6 -translate-x-2/5" />
                            </div>
                        ) : null}
                        <div className="text-md text-primary">
                            {child.props['data-title']}
                        </div>
                        {child}
                    </div>
                );
            }

            return child;
        });
    };

    return <div className="relative">{parseListItems()}</div>;
};

export default DataList;
