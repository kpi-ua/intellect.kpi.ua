import React, { Component } from 'react';
import './ProfileExecutions.css';
import {
  withRouter,
  matchPath
} from "react-router-dom";
import api from "../../services/api";
import ProfileAvatar from "../ProfileAvatar";
import ProfileData from "../ProfileData";

class ProfileExecutions extends Component {

  constructor(props){
    super(props);
    this.state = {
      profile: {},
      executions: []
    };
  }

  async componentDidMount(){
    const profileId = this.getProfileId();
    const profile = await api.getProfile(profileId);
    const executions = await api.getProfileExecutions(profileId);

    this.setState({
      profile: profile,
      executions: executions
    });

  }

  getProfileId() {
    const match = matchPath(this.props.history.location.pathname, {
      path: '/profile/:profileId/executions',
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
            <h2>Виконання науково-дослідних та дослідно-конструкторських робіт</h2>
            <div className="panel-body">
              <ProfileData profile={this.state.profile} records={this.state.executions} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default withRouter(ProfileExecutions);
