const ITab = ({isActive, children, onClick}) => (
    <div onClick={onClick} className={`min-w-100 w-200 min-h-42 rounded-t xs:rounded-b-none rounded-b text-center py-3 cursor-pointer ${isActive ? 'bg-white text-primary' : 'bg-inactive text-white'}`}>
      {children}
    </div>
);

export default ITab;
