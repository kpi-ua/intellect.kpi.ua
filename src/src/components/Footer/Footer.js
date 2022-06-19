import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  // constructor(props){
    // super(props);
    // this.state = {};
  // }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-2 col-sm-2 small-logo">
              <a href="/"><img className="img-fluid" alt="КПІ ім. Ігоря Сікорського" src="/images/logo.png" /></a>
            </div>
            <div className="col-md-5 col-sm-5">
              <br />
              Національний технічний університет України "<a href="http://kpi.ua">Київський політехнічний інститут імені Ігоря Сікорського</a>" &copy; 1998-{(new Date().getFullYear())} <br />
              <br />
              Адреса: Україна, 03056 м.Київ-56, проспект Перемоги, 37<br />
            </div>
            <div className="col-md-5  col-sm-5">
              <br />
              Розробник – <a href="http://kbis.kpi.ua">Конструкторське бюро інформаційних систем</a><br />
              <br />
              Використання матеріалу сайту тільки з обов’язковим посиланням на <a href="https://intellect.kpi.ua">intellect.kpi.ua</a><br />
              <br />
              Каталог створено в рамках проекту "<a href="https://ecampus.kpi.ua">Електронний кампус КПІ</a>"
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;