import React, {Component} from 'react';
import './About.css';

class About extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1>Про проект</h1>

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