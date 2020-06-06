import React, { Component } from 'react';
import './SearchTab.css';
import Alphabet from "../Alphabet";
import * as Icon from 'react-bootstrap-icons';
import {withRouter} from "react-router-dom";

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

    this.redirectToSearchInterests = this.redirectToSearchInterests.bind(this);
    this.redirectToSearchSubdivision = this.redirectToSearchSubdivision.bind(this);
    this.redirectToSearchDefault = this.redirectToSearchDefault.bind(this);
    this.redirectToSearch = this.redirectToSearch.bind(this);

  }

  searchDefault = () => this.setState({tab: 1});
  searchSubdivision = () => this.setState({tab: 2});
  searchAlphabet = () => this.setState({tab: 3});
  searchInterests = () => this.setState({tab: 4});

  redirectToSearchInterests(e) {
    this.redirectToSearch(e, 'interests:');
  }

  redirectToSearchSubdivision(e) {
    this.redirectToSearch(e, 'subdivision:');
  }

  redirectToSearchDefault(e) {
    this.redirectToSearch(e, 'startwith:');
  }

  /**
   * Redirect to search page
   * @param e
   * @param prefix
   */
  redirectToSearch(e, prefix) {
    if (e.keyCode === 13){
      const q = prefix + e.target.value;
      this.props.history.push("/search?q=" + q);
    }
  }

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
          <div className="row search">
              <h2>Загальний пошук спiвробiтникiв</h2>
              <div className="line"/>
              <input type="search"
                     name="q"
                     className="form-control typeahead"
                     onKeyDown={this.redirectToSearchDefault}
                     placeholder="Введiть ПІБ особи... (наприклад: ПЕТРОВ ПЕТРО ПЕТРОВИЧ)" />
              <div className="line"/>
          </div>
        }

        { this.state.tab === 2 &&
          <div className="row search">
            <div className="col-md-12">
              <h2>Пошук за кафедрами та факультетами</h2>
              <div className="line"/>
              <input type="search"
                     name="q"
                     className="form-control typeahead"
                     onKeyDown={this.redirectToSearchSubdivision}
                     placeholder="Введiть назву пiдроздiлу... (наприклад: Кафедра технiчної кiбернетики ФІОТ)" />
              <div className="line"/>
            </div>
          </div>
        }

        { this.state.tab === 3 &&
        <div className="row search">
          <div className="col-md-12 alphabet">
            <Alphabet />
          </div>
        </div>
        }

        { this.state.tab === 4 &&
          <div className="row search">
            <div className="col-md-12">
              <h2>Пошук за інтеpeсами</h2>
              <div className="line"/>
              <input
                type="search"
                name="q"
                className="form-control typeahead"
                onKeyDown={this.redirectToSearchInterests}
                placeholder="Введiть інтереси для пошуку..." />
              <div className="line"/>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(SearchTab);