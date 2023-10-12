const ITab = ({isActive, children, onClick}) => (
    <div onClick={onClick} className={`w-200 min-h-42 rounded-t text-center py-3 cursor-pointer ${isActive ? 'bg-white text-primary' : 'bg-inactive text-white'}`}>
      {children}
    </div>
);

export default ITab;
