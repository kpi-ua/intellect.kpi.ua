import React, { Component } from 'react';
import './ProfileResults.css';
import {
  withRouter,
  matchPath
} from "react-router-dom";
import api from "../../services/api";
import {Button} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import ProfileAvatar from "../ProfileAvatar";
import ProfileData from "../ProfileData";

class ProfileResults extends Component {

  constructor(props){
    super(props);
    this.state = {
      profile: {},
      results: []
    };
  }

  async componentDidMount(){
    const profileId = this.getProfileId();
    const profile = await api.getProfile(profileId);
    const results = await api.getProfileResults(profileId);

    this.setState({
      profile: profile,
      results: results
    });

  }

  getProfileId() {
    const match = matchPath(this.props.history.location.pathname, {
      path: '/profile/:profileId/results',
      exact: true,
      strict: false
    });

    return  match.params.profileId;
  }


  render() {

    return (
      <div className="row profile">
        <div className="col-md-3">
          <ProfileAvatar profile={this.state.profile} />
        </div>

        <div className="col-md-9">
          <div className="panel panel-default">
            <h1>{this.state.profile.fullName}</h1>
            <h2>Результати виконання науково-дослідних та дослідно-конструкторських робіт</h2>
            <div className="panel-body">
              <ProfileData profile={this.state.profile} records={this.state.results} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default withRouter(ProfileResults);