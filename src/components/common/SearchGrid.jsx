const SearchGrid = ({children, className = ''}) => {
  return <div className={'grid grid-cols-6 gap-6 ' + className}>
    {children}
  </div>
}

export default SearchGrid;
