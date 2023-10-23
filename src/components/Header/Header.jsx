import darkLogo from '../../assets/svg/intellect-logo-dark.svg'
import lightLogo from '../../assets/svg/intellect-logo-light.svg'

import { Link } from 'react-router-dom';

import './Header.css'
import Burger from '../Burger/Burger';
import { useState } from 'react';

const links = [
  {to: '/', label: 'Пошук'},
  {to: 'about', label: 'Про проект'},
  {to: 'contacts', label: 'Контакти'},
]

const Header = ({scheme = 'dark', underlined = true}) => {
  const [burgerCollapsed, setBurgerCollapsed] = useState(true);

  const logoSrc = scheme === 'dark' ? darkLogo : lightLogo;

  const navigation = (
    <nav className='flex flex-col xs:flex-row gap-10 xs:gap-5 text-4xl xs:text-base leading-none'>
      {links.map(link => (
        <Link onClick={() => !burgerCollapsed && toggleCollapse(true)} key={link.to} to={link.to}>{link.label}</Link>
      ))}
    </nav>
  )

  const toggleCollapse = newValue => {
    const bodyClass = window.document.body.classList;
    if (newValue && bodyClass.contains('overflow-hidden')) {
      bodyClass.remove('overflow-hidden')
    } else if (!newValue) {
      bodyClass.add('overflow-hidden')
    }

    setBurgerCollapsed(newValue)
  }

  return (
    <header className={'h-100 ' + (underlined ? 'header' : '')}>
      <div className='flex justify-between wrapper h-full items-center'>
        <Link className='cursor-pointer' to='/'><img src={logoSrc} alt='logo' /></Link>
        <Burger onBurgerClick={value => toggleCollapse(value)} collapsed={burgerCollapsed} scheme={scheme} className='block xs:hidden'>
          {navigation}
        </Burger>
        <div className='hidden xs:block'>
          {navigation}
        </div>
      </div>
    </header>
  )
}

export default Header;
