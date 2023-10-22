import React from 'react';

const SectionTitle = ({children, className, isPrimary = true}) => {
  return React.createElement(`h${isPrimary ? '1' : '2'}`, {className: 'text-5xl font-semibold ' + className}, children)
}

export default SectionTitle;
