import React from 'react';

const SectionTitle = ({children, className, isPrimary = true}) => {
  return React.createElement(`h${isPrimary ? '1' : '2'}`, {className: 'font-semibold ' + className}, children)
}

export default SectionTitle;
