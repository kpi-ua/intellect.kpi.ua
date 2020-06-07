import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Search from "./components/Search";
import Profile from "./components/Profile";
import {Nav, Navbar, Container} from "react-bootstrap";
import Footer from "./components/Footer";
import ProfilePublications from "./components/ProfilePublications";
import ProfileExecutions from "./components/ProfileExecutions";
import ProfileConferences from "./components/ProfileConferences";
import ProfileResults from "./components/ProfileResults";

function App() {

  return (
      <Router>

        <header>
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-right">
                Національний технічний університет України «Київський політехнічний інститут імені Ігоря Сікорського»
              </div>
            </div>
          </div>

          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
            <Navbar.Brand href="/"><div className="logo"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="mr-auto">
              </Nav>
              <Nav>
                <Nav.Link href="/search">Пошук</Nav.Link>
                <Nav.Link href="/page/about">Про проект</Nav.Link>
                <Nav.Link href="/page/contacts" className="pull-right">Контакти</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>

        </header>


        <div className="container">
            <section className="row">
              <div className="col-md-12 content">
                {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                <Switch>

                  <Route path="/search">
                    <Search />
                  </Route>
                  <Route path="/page/contacts">
                    <Contacts />
                  </Route>
                  <Route path="/page/about">
                    <About />
                  </Route>
                  <Route path="/profile/:profileId/conference">
                    <ProfileConferences />
                  </Route>
                  <Route path="/profile/:profileId/executions">
                    <ProfileExecutions />
                  </Route>
                  <Route path="/profile/:profileId/publications">
                    <ProfilePublications />
                  </Route>
                  <Route path="/profile/:profileId/results">
                    <ProfileResults />
                  </Route>
                  <Route path="/profile/:profileId">
                    <Profile />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </div>
            </section>
          </div>



        <Footer />

      </Router>
  );
}

export default App;
