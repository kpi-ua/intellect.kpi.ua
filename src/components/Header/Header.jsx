import darkLogo from '../../assets/svg/intellect-logo-dark.svg'
import lightLogo from '../../assets/svg/intellect-logo-light.svg'

const Header = ({scheme = 'dark'}) => {
  const logoSrc = scheme === 'dark' ? darkLogo : lightLogo;

  return (
    <header className='h-100 leading-100 wrapper'>
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
