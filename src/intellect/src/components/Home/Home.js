import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import './Home.css';
import {Jumbotron} from "react-bootstrap";

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


        <div>
          <div className="row search-panel">
            <div className="col-md-3 height-x">
              <a href="#search-form-position" onClick="return showSearchTab('#search-default')">
                <img className="img-circle" src="/images/search-default.png" alt="Пошук спiвробiтникiв" />
                  <span>Загальний пошук спiвробiтникiв</span>
              </a>
            </div>
            <div className="col-md-3 height-x">
              <a href="#search-form-position" onClick="return showSearchTab('#search-subdivision')">
                <img className="img-circle" src="/images/search-subdivision.png" alt="Пошук за кафедрами та факультетами" />
                  <span>Пошук за кафедрами<br/> та факультетами</span>
              </a>
            </div>
            <div className="col-md-3 height-x">
              <a href="#search-form-position" onClick="return showSearchTab('#search-alphabet')" title="">
                <img className="img-circle" src="/images/search-alphabet.png" alt="Алфавітний покажчик" />
                  <span>Алфавітний покажчик</span>
              </a>
            </div>
            <div className="col-md-3 height-x">
              <a href="#search-form-position" onClick="return showSearchTab('#search-interests')">
                <img className="img-circle" src="/images/search-interests.png" alt="Пошук за інтеpeсами" />
                  <span>Пошук за інтеpeсами</span>
              </a>
            </div>
          </div>

          <div className="row" id="science_news">
            <div className="col-md-12">
              <h1 title="Показати/приховати новини">Наукові новини</h1>
              <div id="science_news_content">
                {/*@Html.Raw(Model.Publication.Content)*/}
              </div>
              {/*<script>*/}
              {/*  $(function () {*/}
              {/*  $("#science_news h1").click(function () {*/}
              {/*    $("#science_news_content").toggle();*/}
              {/*  });*/}
              {/*});*/}
              {/*</script>*/}
              <div className="clear"/>
            </div>
          </div>


          <a name="search-form-position"/>
          <form className="row search hidden" id="search-default" action="/search" role="search">
            <div className="col-md-12">
              <h2>Загальний пошук спiвробiтникiв</h2>
              <div className="line"/>
              <input type="search" name="q" id="search-default-input" className="form-control typeahead"
                     placeholder="Введiть ПІБ особи... (наприклад: ПЕТРОВ ПЕТРО ПЕТРОВИЧ)" />
                <div className="line"/>
                <input type="submit" className="search_btn_hidden" />
            </div>
          </form>

          <div className="row search hidden" id="search-alphabet">
            <div className="col-md-12 alphabet">
              @Html.Partial("AlphabetPartialView")
            </div>
          </div>

          <form className="row search hidden" id="search-subdivision" action="/search" role="search"
                onSubmit="setPrefix('subdivision-search-input', 'subdivision')">
            <div className="col-md-12">
              <h2>Пошук за кафедрами та факультетами</h2>
              <div className="line"/>
              <input type="search" name="q" id="subdivision-search-input" className="form-control typeahead"
                     placeholder="Введiть назву пiдроздiлу... (наприклад: Кафедра технiчної кiбернетики ФІОТ)" />
                <div className="line"/>
                <input type="submit" className="search_btn_hidden"/>
            </div>
          </form>

          <form className="row search hidden" id="search-interests" action="/search" role="search"
                onSubmit="setPrefix('interests-serch-input', 'interests')">
          <div className="col-md-12">
            <h2>Пошук за інтеpeсами</h2>
            <div className="line"/>
            <input type="search" name="q" className="form-control typeahead"
                   placeholder="Введiть інтереси для пошуку..." id="interests-serch-input" />
              <div className="line"/>
              <input type="submit" className="search_btn_hidden"/>
          </div>
        </form>
        </div>

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