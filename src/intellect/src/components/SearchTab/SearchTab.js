import React, { Component } from 'react';
import './SearchTab.css';
import Alphabet from "../Alphabet";

class SearchTab extends Component {

  searchDefault = function () {
  }

  searchSubdivision = function() {

  }

  searchAlphabet = function() {

  }

  searchInterests = function() {

  }

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
        <div className="row search-panel">
          <div className="col-md-3 height-x">
            <a href="#search-form-position" onClick={this.searchDefault}>
              <img className="img-circle" src="/images/search-default.png" alt="Пошук спiвробiтникiв" />
              <span>Загальний пошук спiвробiтникiв</span>
            </a>
          </div>
          <div className="col-md-3 height-x">
            <a href="#search-form-position" onClick={this.searchSubdivision}>
              <img className="img-circle" src="/images/search-subdivision.png" alt="Пошук за кафедрами та факультетами" />
              <span>Пошук за кафедрами<br/> та факультетами</span>
            </a>
          </div>
          <div className="col-md-3 height-x">
            <a href="#search-form-position" onClick={this.searchAlphabet}>
              <img className="img-circle" src="/images/search-alphabet.png" alt="Алфавітний покажчик" />
              <span>Алфавітний покажчик</span>
            </a>
          </div>
          <div className="col-md-3 height-x">
            <a href="#search-form-position" onClick={this.searchInterests}>
              <img className="img-circle" src="/images/search-interests.png" alt="Пошук за інтеpeсами" />
              <span>Пошук за інтеpeсами</span>
            </a>
          </div>
        </div>

        <a name="search-form-position"/>
        <form className="row search d-none" id="search-default" action="/search" role="search">
          <div className="col-md-12">
            <h2>Загальний пошук спiвробiтникiв</h2>
            <div className="line"/>
            <input type="search" name="q" id="search-default-input" className="form-control typeahead"
                   placeholder="Введiть ПІБ особи... (наприклад: ПЕТРОВ ПЕТРО ПЕТРОВИЧ)" />
            <div className="line"/>
            <input type="submit" className="search_btn_hidden" />
          </div>
        </form>

        <div className="row search d-none" id="search-alphabet">
          <div className="col-md-12 alphabet">
            <Alphabet />
          </div>
        </div>

        <form className="row search d-none" id="search-subdivision" action="/search" role="search"
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

        <form className="row search d-none" id="search-interests" action="/search" role="search"
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
    );
  }
}

export default SearchTab;