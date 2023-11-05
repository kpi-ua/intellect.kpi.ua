import React from "react";

type Props = {
    className?: string,
    links: ECampus.Anchor[],
    activeAnchor: string | null,
}

const TableContent: React.FC<Props> = ({className = '', links, activeAnchor}) => {
  return (
    <div className={className}>
      <div className='text-sm'>Зміст</div>
      {links.map(link => (
        <a
          key={link.id}
          className={'block text-xs mt-2 text-neutral-500 ' + (activeAnchor === link.id ? 'text-primary' : '')}
          href={link.path}>
          {link.label}
        </a>
      ))}
    </div>
  )
}

export default TableContent;
