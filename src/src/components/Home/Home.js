import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import './Home.css';
import SearchTab from "../SearchTab";

class Home extends Component {
  render() {
    return (
      <div>


        <Carousel>
          <Carousel.Item>
            <img
                className="d-block w-100"
                src="https://intellect.kpi.ua/static/slides/b1.jpg"
                alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
                className="d-block w-100"
                src="https://intellect.kpi.ua/static/slides/b2.jpg"
                alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
                className="d-block w-100"
                src="https://intellect.kpi.ua/static/slides/b3.jpg"
                alt="Third slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
                className="d-block w-100"
                src="https://intellect.kpi.ua/static/slides/b4.jpg"
                alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>


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