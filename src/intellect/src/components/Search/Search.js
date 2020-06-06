import React, { Component } from 'react';
import {
  withRouter
} from "react-router-dom";
import './Search.css';
import Alphabet from "../Alphabet";
import api from "../../services/api";
import * as Icon from 'react-bootstrap-icons';

class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
        q: '',
        profiles: [],
        paging: {}
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

    const result = await api.searchPublicProfiles(query);
    this.setState({profiles: result.data});
    this.setState({paging: result.paging});
  }

  async componentDidMount() {
    let params = new URLSearchParams(this.props.location.search);
    await this.search(params.get('q'));
  }

  render() {

    let result = [];

    function getPosition(item) {
      if (!item || !item.Positions || item.Positions.length == 0) {
        return '';
      }

      return item.Positions[0].Name;
    }

    function getSubdivision(item) {
      if (!item || !item.Positions || item.Positions.length == 0) {
        return '';
      }

      return  item.Positions[0].Subdivision.Name;
    }

    if (!!this.state.profiles && this.state.profiles.length > 0) {

      // "Positions": [
      //   {
      //     "Name": "Доцент",
      //     "Subdivision": {
      //       "Url": "http://tc.kpi.ua",
      //       "Logo": null,
      //       "Address": null,
      //       "Name": "Кафедра технiчної кiбернетики ФІОТ",
      //       "Id": 10193
      //     },
      //     "Employment": 0
      //   }
      // ],
      //   "Fields": {},
      // "Status": "Доцент",
      //   "Items": [],
      //   "ScientificInterest": "Інформаційні та комунікаційні технології. Інтелектуальні інформаційні та інформаційно-аналітичні технології.  Інтегровані  системи баз даних та знань.  Національні інформаційні ресурси. Технології та засоби розробки програмних продуктів і систем.",
      //   "AcademicDegree": "Кандидат наук",
      //   "AcademicStatus": "",
      //   "ContactRecords": null,
      //   "IsConfirmed": true,
      //   "UserIdentifier": "mky",
      //   "FullName": "Мелкумян Катерина Юріївна",
      //   "Photo": "https://api.campus.kpi.ua/Account/81/ProfileImage",
      //   "Credo": "Разум ищет, и только сердце находит",
      //   "Profile": "https://intellect.kpi.ua/profile/mky",
      //   "Id": 0

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

        // <div className="col-md-4 search-result-item">
        //   <div className="row">
        //     <div className="col-md-6">
        //       <a href={"/profile/" + item.UserIdentifier}>
        //         <img
        //           className="img-fluid"
        //           src={item.Photo}
        //           alt={item.FullName}
        //           title={item.FullName} />
        //       </a>
        //     </div>
        //     <div className="col-md-6">
        //       <a href={"/profile/" + item.UserIdentifier}>
        //         <h4>{item.FullName}</h4>
        //       </a>
        //       <div>
        //         <div>{getPosition(item)}</div>
        //         <div>{getSubdivision(item)}</div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
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

        <div className="row">
          <div className="col-md-12 search-result">
            <div className="row">
              {result}
            </div>
            <ul className="pagination"/>
          </div>
        </div>

      </div>
    );
  }
}

export default withRouter(Search);