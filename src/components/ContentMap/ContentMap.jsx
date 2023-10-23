import React, { useEffect, useRef, useState } from 'react';

import TableContent from '../TableContent/TableContent';

const ContentMap = ({children, className = '', anchorsClass = ''}) => {
  const [anchors, setAnchors] = useState([]);
  const [activeAnchor, setActiveAnchor] = useState(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    setAnchors(parseAnchors());
    scrollHandler();
    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler)
  }, [children]);

  const scrollHandler = () => {
    for (const element of itemsRef.current) {
      if (element.getBoundingClientRect().bottom > 0) {
        setActiveAnchor(element.id);
        break;
      }
    }
  }

  const parseAnchors = () => {
      const anchors = [];
      React.Children.forEach(children, child => {
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
          return React.cloneElement(child, {ref: el => itemsRef.current[idx] = el})
        })}
      </div>
      <div className={'relative flex-1 min-w-140 ' + anchorsClass}>
        <TableContent className='sticky top-0 text-primary' links={anchors} activeAnchor={activeAnchor} />
      </div>
    </div>
  )
}

export default ContentMap;
