import React, { Component } from 'react';
import './About.css';

class About extends Component {
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
        <h1>Про проект</h1>
        <div>
          Об′єднує вчених, викладачів, інженерів та аспірантів університету, які займаються інтелектуальною творчою
          діяльністю, проводять фундаментальні та прикладні наукові дослідження, впроваджують отримані результати в
          виробництво, займаються навчальною, методичною і організаційною роботою.
          <br/>
          <br/>
          Має за мету поширення знань на державному та світовому рівнях про досягнення співробітників університету в
          науковій і навчальній роботі, обмін досвідом та сприяння спілкуванню.
        </div>
      </div>
    );
  }
}

export default About;