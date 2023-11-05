import React, {JSX, useEffect, useRef, useState} from 'react';

import TableContent from '../TableContent/TableContent';

type Props = {
    children: JSX.Element[],
    className?: string,
    anchorsClass?: string,
}

const ContentMap: React.FC<Props> = ({children, className = '', anchorsClass = ''}) => {
  const [anchors, setAnchors] = useState<ECampus.Anchor[]>([]);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const itemsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    setAnchors(parseAnchors());
    scrollHandler();
    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler)
  }, [children]);

  const scrollHandler = () => {
    for (const element of itemsRef!.current) {
      if (element.getBoundingClientRect().bottom > 0) {
        setActiveAnchor(element.id);
        break;
      }
    }
  }

  const parseAnchors = (): ECampus.Anchor[] => {
      const anchors: ECampus.Anchor[] = [];
      React.Children.forEach(children, (child: JSX.Element) => {
        if (child.props.id && child.props['data-label']) {
          anchors.push({id: child.props.id, path: '#' + child.props.id, label: child.props['data-label']})
        }
      })

      return anchors;
  }

  return (
    <div className={'relative flex justify-between ' + className}>
      <div>
        {React.Children.map(children, (child, idx) => {
          return React.cloneElement(child, {ref: (el: HTMLElement) => itemsRef.current[idx] = el})
        })}
      </div>
      <div className={'relative flex-1 min-w-140 ' + anchorsClass}>
        <TableContent className='sticky top-0 text-primary' links={anchors} activeAnchor={activeAnchor} />
      </div>
    </div>
  )
}

export default ContentMap;
