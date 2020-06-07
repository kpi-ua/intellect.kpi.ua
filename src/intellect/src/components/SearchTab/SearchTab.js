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

    this.redirectToSearch = this.redirectToSearch.bind(this);

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
          <div
            className={"col-md-3 height-x " + (this.state.tab === 1 ? 'selected' : '')}
            onClick={() => this.setState({tab: 1})}
          >
              <Icon.PersonFill size={32} className="search-tab-icon" />
              <span>Загальний пошук спiвробiтникiв</span>
          </div>
          <div
            className={"col-md-3 height-x " + (this.state.tab === 2 ? 'selected' : '')}
            onClick={() => this.setState({tab: 2})}
          >
              <Icon.Building size={32} className="search-tab-icon" />
              <span>Пошук за кафедрами<br/> та факультетами</span>
          </div>
          <div
            className={"col-md-3 height-x " + (this.state.tab === 3 ? 'selected' : '')}
            onClick={() => this.setState({tab: 3})}
          >
              <Icon.CardList size={32} className="search-tab-icon" />
              <span>Алфавітний покажчик</span>
          </div>
          <div
            className={"col-md-3 height-x " + (this.state.tab === 4 ? 'selected' : '')}
            onClick={() => this.setState({tab: 4})}
          >
              <Icon.Intersect size={32} className="search-tab-icon" />
              <span>Пошук за інтеpeсами</span>
          </div>
        </div>

        { this.state.tab === 1 &&
          <div className="row search">
            <div className="col-md-12">
              <h2>Загальний пошук спiвробiтникiв</h2>
              <div className="line"/>
              <input type="search"
                     className="form-control typeahead"
                     onKeyDown={(e) => this.redirectToSearch(e, 'startwith:')}
                     placeholder="Введiть ПІБ особи... (наприклад: ПЕТРОВ ПЕТРО ПЕТРОВИЧ)" />
              <div className="line"/>
            </div>
          </div>
        }

        { this.state.tab === 2 &&
          <div className="row search">
            <div className="col-md-12">
              <h2>Пошук за кафедрами та факультетами</h2>
              <div className="line"/>
              <input type="search"
                     className="form-control typeahead"
                     onKeyDown={(e) => this.redirectToSearch(e, 'subdivision:')}
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
                className="form-control typeahead"
                onKeyDown={(e) => this.redirectToSearch(e, 'interests:')}
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