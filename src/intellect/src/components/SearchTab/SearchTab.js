import React, { Component } from 'react';
import './SearchTab.css';
import Alphabet from "../Alphabet";
import * as Icon from 'react-bootstrap-icons';

class SearchTab extends Component {

  constructor(props){
    super(props);

    this.state = {
      tab: null
    };

    this.searchDefault = this.searchDefault.bind(this);
    this.searchSubdivision = this.searchSubdivision.bind(this);
    this.searchAlphabet = this.searchAlphabet.bind(this);
    this.searchInterests = this.searchInterests.bind(this);

  }

  searchDefault() {
    this.setState({tab: 1});
  }

  searchSubdivision() {
    this.setState({tab: 2});
  }

  searchAlphabet() {
    this.setState({tab: 3});
  }

  searchInterests() {
    this.setState({tab: 4});
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
          <div className={"col-md-3 height-x " + (this.state.tab === 1 ? 'selected' : '')} onClick={this.searchDefault}>
              <Icon.PersonFill size={32} className="search-tab-icon" />
              <span>Загальний пошук спiвробiтникiв</span>
          </div>
          <div className={"col-md-3 height-x " + (this.state.tab === 2 ? 'selected' : '')} onClick={this.searchSubdivision}>
              <Icon.Building size={32} className="search-tab-icon" />
              <span>Пошук за кафедрами<br/> та факультетами</span>
          </div>
          <div className={"col-md-3 height-x " + (this.state.tab === 3 ? 'selected' : '')} onClick={this.searchAlphabet}>
              <Icon.CardList size={32} className="search-tab-icon" />
              <span>Алфавітний покажчик</span>
          </div>
          <div className={"col-md-3 height-x " + (this.state.tab === 4 ? 'selected' : '')} onClick={this.searchInterests}>
              <Icon.Intersect size={32} className="search-tab-icon" />
              <span>Пошук за інтеpeсами</span>
          </div>
        </div>

        { this.state.tab === 1 &&
          <form className="row search" id="search-default" action="/search" role="search">
            <div className="col-md-12">
              <h2>Загальний пошук спiвробiтникiв</h2>
              <div className="line"/>
              <input type="search" name="q" id="search-default-input" className="form-control typeahead"
                     placeholder="Введiть ПІБ особи... (наприклад: ПЕТРОВ ПЕТРО ПЕТРОВИЧ)" />
              <div className="line"/>
              <input type="submit" className="search_btn_hidden" />
            </div>
          </form>
        }

        { this.state.tab === 2 &&
          <form className="row search" id="search-subdivision" action="/search" role="search"
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
        }

        { this.state.tab === 3 &&
        <div className="row search" id="search-alphabet">
          <div className="col-md-12 alphabet">
            <Alphabet />
          </div>
        </div>
        }

        { this.state.tab === 4 &&
          <form className="row search" id="search-interests" action="/search" role="search"
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
        }
      </div>
    );
  }
}

export default SearchTab;