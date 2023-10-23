import darkLogo from '../../assets/svg/intellect-logo-dark.svg'
import lightLogo from '../../assets/svg/intellect-logo-light.svg'

import { Link } from 'react-router-dom';

import './Header.css'

const Header = ({scheme = 'dark', underlined = true}) => {
  const logoSrc = scheme === 'dark' ? darkLogo : lightLogo;

  return (
    <header className={'h-100 leading-100 ' + (underlined ? 'header' : '')}>
      <div className='flex justify-between wrapper'>
        <img src={logoSrc} alt='logo' />
        <nav className='flex gap-5'>
          <Link to='/'>Пошук</Link>
          <Link to='about'>Про проект</Link>
          <Link to='contacts'>Контакти</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header;
