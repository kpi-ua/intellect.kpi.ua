import React, { Component } from 'react';
import './ProfileConferences.css';
import {
  withRouter,
  matchPath
} from "react-router-dom";
import api from "../../services/api";
import ProfileAvatar from "../ProfileAvatar";
import ProfileData from "../ProfileData";

class ProfileConferences extends Component {

  constructor(props){
    super(props);
    this.state = {
      profile: {},
      conferences: [],
      loading: true
    };
  }

  async componentDidMount(){
    const profileId = this.getProfileId();
    const profile = await api.getProfile(profileId);
    const conferences = await api.getProfileConferences(profileId);

    this.setState({
      profile: profile,
      conferences: conferences,
      loading: false
    });

  }

  getProfileId() {
    const match = matchPath(this.props.history.location.pathname, {
      path: '/profile/:profileId/conference',
      exact: true,
      strict: false
    });

    return  match.params.profileId;
  }


  render() {

    return (
      <div className="row">
        <div className="col-md-3">
          <ProfileAvatar profile={this.state.profile} />
        </div>

        <div className="col-md-9">
          <h1>{this.state.profile.fullName}</h1>
          <h2>Конференції, виставки</h2>

          {
            !this.state.loading  &&
            <ProfileData profile={this.state.profile} records={this.state.conferences} />
          }

        </div>
      </div>
    );
  }
}

export default withRouter(ProfileConferences);