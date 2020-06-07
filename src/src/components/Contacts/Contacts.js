import React, { Component } from 'react';
import './Contacts.css';

class Contacts extends Component {
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
      <div>
        <h1>Контакти</h1>

        <strong>Інформаційна підтримка</strong><br/>
        тел.: +38 (044) 454 98 45<br/>
        факс: +38 (044) 454 98 45<br/>
        e-mail: <a href="mailto:ecampus@kpi.ua">ecampus@kpi.ua</a><br/>
        <br/>
      </div>
    );
  }
}

export default Contacts;