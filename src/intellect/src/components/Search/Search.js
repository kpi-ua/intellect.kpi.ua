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

    this.setQuery = this.setQuery.bind(this);
  }

  setQuery = (q) => this.setState({q});
  handleChange = (e) => this.setState({q: e.target.value});

  async componentDidMount() {
    let params = new URLSearchParams(this.props.location.search);
    let q = params.get('q');
    this.setState({q});
  }

  render() {

    return (
      <div>
        <h1>Пошук {this.state.q}</h1>

        <div className="row">
          <div className="col-md-12 alphabet">
            <Alphabet onSelectLetter={this.setQuery} />
          </div>
        </div>


        <div className="row search">
          <div className="col-md-12">
            <div className="input-group search-container">
              <input type="search" id="input" value={this.state.q} onChange={this.handleChange} className="form-control" />
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