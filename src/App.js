import Header from './components/Header/Header';
import ISearchBlock from './components/I-SearchBlock/I-SearchBlock';
import Footer from './components/Footer/Footer';

import headerLogo from './assets/svg/intellect-logo.svg'
import bottomLogo from './assets/svg/kpi-logo.svg'

const App = () => {
  return (
    <>
      <div className='header-wrapper text-white'>
        <div className="wrapper">
          <Header logoSrc={headerLogo}/>
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
