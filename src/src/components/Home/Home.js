import React, { Component } from 'react';
import './Home.css';
import SearchTab from "../SearchTab";

class Home extends Component {
  render() {
    return (
      <div>

        <div className="welcome">
          <h1>Інтелект <span className="grey">Пошук викладачів та науковців</span></h1>
          КПІ ім. Ігоря Сікорського
        </div>

        <SearchTab />

        Проект об′єднує вчених, викладачів, інженерів та аспірантів університету, які займаються інтелектуальною
        творчою діяльністю, проводять фундаментальні та прикладні наукові дослідження, впроваджують отримані результати
        в виробництво, займаються навчальною, методичною і організаційною роботою.
        <br />
        <br />
      </div>
    );
  }
}

export default Home;