import Header from './components/Header/Header';
import ISearchBlock from './components/I-SearchBlock/I-SearchBlock';
import Footer from './components/Footer/Footer';

import bottomLogo from './assets/svg/kpi-logo.svg'

import './index.css';
import { useOutlet } from 'react-router-dom';
import React from "react";

const App: React.FC = () => {
  const outlet = useOutlet();

  return !outlet ? (
    <>
      <div className='header-wrapper text-white'>
        <Header underlined={false} scheme='light'/>
        <div className="wrapper">
          <ISearchBlock />
        </div>
      </div>
      <div className="wrapper">
        <div className='min-h-220' />
      </div>
      <Footer logoSrc={bottomLogo} />
    </>
  ) : (
    <>
      <Header scheme='dark' />
        <div className="wrapper">
          {outlet}
        </div>
      <Footer logoSrc={bottomLogo} />
    </>
  )
}

export default App;
