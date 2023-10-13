const Header = ({logoSrc}) => {
  return (
    <header className='h-100 leading-100'>
      <div className='flex justify-between'>
        <img src={logoSrc} alt='logo' />
        <nav className='flex gap-5'>
          <a href='#'>Пошук</a>
          <a href='#'>Про проект</a>
          <a href='#'>Контакти</a>
        </nav>
      </div>
    </header>
  )
}

export default Header;
