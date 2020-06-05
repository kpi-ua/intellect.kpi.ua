import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Search from "./components/Search";
import Profile from "./components/Profile";

function App() {
  return (
      <Router>

        <div id="main_container">
          <header>
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-right">
                  Національний технічний університет України «Київський політехнічний інститут імені Ігоря Сікорського»
                </div>
              </div>
            </div>
          </header>

          <nav className="navbar navbar-default navigation">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"/>
                  <span className="icon-bar"/>
                  <span className="icon-bar"/>
                </button>
                <a className="navbar-brand" href="/">
                  <div className="logo"/>
                </a>
              </div>
              <div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">

                  <li><Link to="/">Головна</Link></li>
                  <li><Link to="/Search">Пошук</Link></li>
                  <li><Link to="/page/about">Про проект</Link></li>
                  <li><Link to="/page/contacts">Контакти</Link></li>
                </ul>
              </div>
            </div>
          </nav>


          <div className="container">
            <section className="row">
              <div className="col-md-12 content">
                {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                <Switch>
                  <Route path="/profile">
                    <Profile />
                  </Route>
                  <Route path="/search">
                    <Search />
                  </Route>
                  <Route path="/page/contacts">
                    <Contacts />
                  </Route>
                  <Route path="/page/about">
                    <About />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </div>
            </section>
          </div>
        </div>

        <footer>
          <div className="container">
            <div className="row">
              <div className="col-md-2 col-sm-2 small-logo">
                <a href="/"><img className="img-responsive" alt="КПІ ім. Ігоря Сікорського" src="/images/logo_footer.png" /></a>
              </div>
              <div className="col-md-5 col-sm-5">
                Національний технічний університет України "<a href="http://kpi.ua">Київський політехнічний інститут імені Ігоря Сікорського</a>", 1998-@DateTime.Now.Year &copy;<br />
                Адреса: Україна, 03056 м.Київ-56, проспект Перемоги, 37<br />
              </div>
              <div className="col-md-5  col-sm-5">
                Розробник каталогу - <a href="http://kbis.kpi.ua">Конструкторське бюро інформаційних систем</a><br />
                Використання матеріалу сайту тільки з обов’язковим посиланням на <a href="https://intellect.kpi.ua">intellect.kpi.ua</a><br />
                Каталог створено в рамках проекту "<a href="https://ecampus.kpi.ua">Електронний кампус КПІ</a>"
              </div>
            </div>
          </div>
        </footer>

      </Router>
  );
}

export default App;
