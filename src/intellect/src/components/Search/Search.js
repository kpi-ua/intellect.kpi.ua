import React, { Component } from 'react';
import './Search.css';
import Alphabet from "../Alphabet";

class Search extends Component {
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
        <h2>Пошук</h2>

        <div className="row">
          <div className="col-md-12 alphabet">
            <Alphabet />
          </div>
        </div>

        <div className="row search">
          <div className="col-md-12">
            <div className="input-group search-container">
              <input type="search" id="input" className="form-control" />
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

export default Search;