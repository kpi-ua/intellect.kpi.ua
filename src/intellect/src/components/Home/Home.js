import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import './Home.css';
import {Jumbotron} from "react-bootstrap";
import Alphabet from "../Alphabet";
import SearchTab from "../SearchTab";

class Home extends Component {
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


        <Carousel>
          <Carousel.Item>
            <img
                className="d-block w-100"
                src="https://intellect.kpi.ua/static/slides/b1.jpg"
                alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
                className="d-block w-100"
                src="https://intellect.kpi.ua/static/slides/b2.jpg"
                alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
                className="d-block w-100"
                src="https://intellect.kpi.ua/static/slides/b3.jpg"
                alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
                className="d-block w-100"
                src="https://intellect.kpi.ua/static/slides/b4.jpg"
                alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>


        <SearchTab />

        <div id="science_news_content">
          <h4>Університет MIT виклав безкоштовно лекції в Мережу</h4>
          <img
              src="https://3.bp.blogspot.com/-6nDzDOH4HVY/V_FsfRl1RNI/AAAAAAAAAQ8/u8HZPsidOwYs-cQhUlxzHLLGqR8_DUDVwCLcB/s1600/MIT.jpg"
              className="img-fluid" />
          <br />
          <div>
            Один з кращих технологічних вузів світу опублікував більшість своїх навчальних курсів, лекцій і
            семінарів в інтернеті на окремому ресурсі. Є аудіо і відео-курси, пошук по каталогу, по номеру курсу, по
            найменуванню дисципліни, всі предмети і ступінь складності розділені в окремі рубрики.
            <br />
            Кожен курс створений на підставі реального курсу МІТ, лекції були зняті на відео і викладено на сайті
            в якості навчального матеріалу.
            Лекції доступні за посиланням: <a href="http://ocw.mit.edu/">ocw.mit.edu</a>

            <br />
            <br/>
            <a href="http://yamaha3.livejournal.com/196895.html">Джерело</a>.
            <br />
            <br />
          </div>
        </div>

      </div>
    );
  }
}

export default Home;