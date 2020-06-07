import React, { Component } from 'react';
import './ProfilePublications.css';
import {
  withRouter,
  matchPath
} from "react-router-dom";
import api from "../../services/api";
import {Button} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import ProfileAvatar from "../ProfileAvatar";
import ProfileData from "../ProfileData";

class ProfilePublications extends Component {

  constructor(props){
    super(props);
    this.state = {
      profile: {},
      publications: []
    };
  }

  async componentDidMount(){
    const profileId = this.getProfileId();
    const profile = await api.getProfile(profileId);
    const publications = await api.getProfilePublications(profileId);

    this.setState({
      profile: profile,
      publications: publications
    });

  }

  getProfileId() {
    const match = matchPath(this.props.history.location.pathname, {
      path: '/profile/:profileId/publications',
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
            <h2>Публікації</h2>
            <div className="panel-body">
              <ProfileData profile={this.state.profile} records={this.state.publications} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default withRouter(ProfilePublications);