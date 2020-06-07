import React, { Component } from 'react';
import {
  withRouter
} from "react-router-dom";
import './Search.css';
import Alphabet from "../Alphabet";
import api from "../../services/api";
import * as Icon from 'react-bootstrap-icons';
import ProgressBar from "../ProgressBar";

class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
        q: '',
        profiles: [],
        paging: {},
        loading: true
    };

    this.updateSearchQuery = this.updateSearchQuery.bind(this);
    this.selectLetter = this.selectLetter.bind(this);
    this.search = this.search.bind(this);
  }

  /**
   * When user click on alphabet
   * @param letter
   */
  selectLetter = async (letter) => await this.search(letter);

  /**
   * When user type in search box
   * @param e
   */
  updateSearchQuery = async (e) => await this.search(e.target.value);

  /**
   * Search public profile
   * @param query
   */
  async search(query) {
    this.setState({q: query});

    this.setState({loading: true});

    const result = await api.searchPublicProfiles(query);

    this.setState({
      profiles: result.data,
      paging: result.paging,
      loading: false
    });
  }

  async componentDidMount() {
    let params = new URLSearchParams(this.props.location.search);
    await this.search(params.get('q'));
  }

  render() {

    let result = [];

    /**
     * Get primary position
     * @param item
     * @returns {string}
     */
    function getPosition(item) {
      if (!item || !item.Positions || item.Positions.length === 0) {
        return '';
      }

      return item.Positions[0].Name;
    }

    /**
     * Get primary subdivision
     * @param item
     * @returns {string}
     */
    function getSubdivision(item) {
      if (!item || !item.Positions || item.Positions.length === 0) {
        return '';
      }

      return  item.Positions[0].Subdivision.Name;
    }

    if (!!this.state.profiles && this.state.profiles.length > 0) {

      result = this.state.profiles.map((item, index) =>

        <div className="col-md-3 d-flex align-items-stretch" key={"uk-" + index}>
          <div className="card">
            <a
              href={"/profile/" + item.UserIdentifier}
              className="image">
                <img
                  className="card-img-top"
                  src={item.Photo}
                  alt={item.FullName}
                  title={item.FullName} />
            </a>
            <div className="card-body">
              <h5 className="card-title"><a href={"/profile/" + item.UserIdentifier}>{item.FullName}</a></h5>
              <p className="card-text">
                <strong>{getPosition(item)}</strong>
                <br />
                {getSubdivision(item)}
              </p>
            </div>
          </div>
        </div>
      );
    }


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
            <div className="input-group">
              <input type="search" id="input" value={this.state.q} onChange={this.updateSearchQuery} className="form-control" />
              <span className="input-group-btn">
                  <button className="btn btn-default search-button" onClick={this.updateSearchQuery} value="Search">
                    <Icon.Search />
                    <span className="glyphicon glyphicon-search"/></button>
              </span>
            </div>
          </div>
        </div>

        <ProgressBar visible={this.state.loading} />

        {
          !this.state.loading  &&

          <div className="row">
            <div className="col-md-12 search-result">
              <div className="row">
                {result}
              </div>
              <ul className="pagination"/>
            </div>
          </div>
        }

      </div>
    );
  }
}

export default withRouter(Search);