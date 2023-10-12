const CommonButton = ({className, children}) => {
  const defaultClasses = 'w-90 h-40 text-white bg-primary rounded-lg flex items-center justify-center cursor-pointer text-sm '

  return (
    <div className={defaultClasses + className}>
      {children}
    </div>
  )
}

export default CommonButton;
