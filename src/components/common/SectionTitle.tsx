import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  isPrimary?: boolean;
};

const SectionTitle: React.FC<Props> = ({ children, className = '', isPrimary = true }) => {
  return React.createElement(`h${isPrimary ? '1' : '2'}`, { className: 'font-semibold ' + className }, children);
};

export default SectionTitle;
