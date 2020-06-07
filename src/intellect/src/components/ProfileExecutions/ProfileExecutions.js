import React, { Component } from 'react';
import './ProfileExecutions.css';
import api from "../../services/api";
import {matchPath, withRouter} from "react-router-dom";

class ProfileExecutions extends Component {
  // constructor(props){
    // super(props);
    // this.state = {};
  // }

  // componentWillMount(){}

  async componentDidMount(){
    const profileId = this.getProfileId();
    const profile = await api.getProfile(profileId);
    const executions = await api.getProfileExecutions(profileId);

    this.setState({
      profile:profile,
      executions:executions
    });

    debugger;
  }

  getProfileId() {
    const match = matchPath(this.props.history.location.pathname, {
      path: '/profile/:profileId/executions',
      exact: true,
      strict: false
    });

    return  match.params.profileId;
  }

  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    return (
      <div></div>
    );
  }
}

export default withRouter(ProfileExecutions);