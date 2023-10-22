import Header from './components/Header/Header';
import ISearchBlock from './components/I-SearchBlock/I-SearchBlock';
import Footer from './components/Footer/Footer';
import RoutePointer from './components/RoutePointer/RoutePointer';

import bottomLogo from './assets/svg/kpi-logo.svg'

import './index.css';
import IAbout from './components/pages/I-About/I-About';
import Contacts from './components/pages/Contacts/Contacts';

const App = () => {
  return (
    <>
      <div className='header-wrapper text-white'>
        <div className="wrapper">
          <Header scheme='light'/>
          <ISearchBlock />
        </div>
      </div>
      <div className="wrapper">
        <div className='min-h-220' />
      </div>
      <Footer logoSrc={bottomLogo} />
    </>
  )
}

export default App;
