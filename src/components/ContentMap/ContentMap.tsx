import React, { JSX, useEffect, useRef, useState } from 'react';

import TableContent from '@/components/TableContent/TableContent';
import SectionTitle from '@/components/common/SectionTitle';

import { debounce } from '@/utils';
import { Anchor } from '@/types/ecampus';

type Props = {
    children: JSX.Element[];
    className?: string;
    anchorsClass?: string;
};

const ContentMap: React.FC<Props> = ({ children, className = '', anchorsClass = '' }) => {
    const [anchors, setAnchors] = useState<Anchor[]>([]);
    const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
    const itemsRef = useRef<HTMLElement[]>([]);

    useEffect(() => {
        if (children && children.length) {
            setAnchors(parseAnchors());
            scrollHandler();
            window.addEventListener('scroll', scrollHandler);

            return () => window.removeEventListener('scroll', scrollHandler);
        }
    }, [children]);

    const scrollHandlerCb = () => {
        for (const element of itemsRef!.current) {
            if (element && element.getBoundingClientRect().bottom > 0) {
                setActiveAnchor(element.id);
                break;
            }
        }
    };
    const scrollHandler = debounce(scrollHandlerCb, 50);

    const parseAnchors = (): Anchor[] => {
        const anchors: Anchor[] = [];
        React.Children.forEach(children, (child: JSX.Element) => {
            if (child.props.id && child.props['data-label']) {
                anchors.push({
                    id: child.props.id,
                    path: '#' + child.props.id,
                    label: child.props['data-label'],
                });
            }
        });

        return anchors;
    };

    return children && children.length ? (
        <div className={'relative flex justify-between ' + className}>
            <div>
                {React.Children.map(children, (child, idx) => {
                    return React.cloneElement(child, {
                        ref: (el: HTMLElement) => (itemsRef.current[idx] = el),
                    });
                })}
            </div>
            <div className={'relative flex-1 min-w-140 ' + anchorsClass}>
                <TableContent className="sticky top-0 text-primary" links={anchors} activeAnchor={activeAnchor} />
            </div>
        </div>
    ) : (
        <SectionTitle className="mt-3 mb-24 text-primary">Дані відсутні</SectionTitle>
    );
};

export default ContentMap;
