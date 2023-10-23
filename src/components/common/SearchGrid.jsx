const SearchGrid = ({children, className = ''}) => {
  return <div className={'grid grid-cols-teachers gap-6 ' + className}>
    {children}
  </div>
}

export default SearchGrid;
