import React, {Component} from 'react';
import './Contacts.css';

class Contacts extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1>Контакти</h1>

          <strong>Інформаційна підтримка</strong><br/>
          тел.: +38 (044) 454 98 45<br/>
          факс: +38 (044) 454 98 45<br/>
          e-mail: <a href="mailto:ecampus@kpi.ua">ecampus@kpi.ua</a><br/>
          <br />

          <strong>
          <a href="https://ecampus.kpi.ua/feedback">Форма скарг i пропозицiй</a>
          </strong>

        </div>
      </div>
    );
  }
}

export default Contacts;