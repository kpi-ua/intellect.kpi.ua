import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Link,
    useLocation, withRouter
} from "react-router-dom";
import './Search.css';
import Alphabet from "../Alphabet";
import api from "../../services/api";

class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
        q: ''
    };

    this.updateSearchQuery = this.updateSearchQuery.bind(this);
    this.selectLetter = this.selectLetter.bind(this);
    this.search = this.search.bind(this);
  }

  /**
   * When user click on alphabet
   * @param q
   */
  selectLetter = (letter) => this.search(letter);

  /**
   * When user type in search box
   * @param e
   */
  updateSearchQuery = (e) => this.search(e.target.value);

  /**
   * Search public profile
   * @param query
   */
  search(query) {
    this.setState({q: query});
    console.log(query);
  }

  async componentDidMount() {
    let params = new URLSearchParams(this.props.location.search);
    this.search(params.get('q'));
  }

  render() {

    return (
      <div>
        <h1>Пошук</h1>
        <br />
        <div className="row">
          <div className="col-md-12 alphabet">
            <Alphabet onSelectLetter={this.selectLetter} />
          </div>
        </div>


        <div className="row search">
          <div className="col-md-12">
            <div className="input-group search-container">
              <input type="search" id="input" value={this.state.q} onChange={this.updateSearchQuery} className="form-control" />
              <span className="input-group-btn">
                  <button id="search" className="btn btn-default" value="Search">
                    <span className="glyphicon glyphicon-search"/></button>
              </span>
            </div>

          </div>

        </div>

        <div className="row">
          <div className="col-md-12">
            <div id="search-result"/>
            <ul className="pagination"/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);