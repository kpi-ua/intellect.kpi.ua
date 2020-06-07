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
      profile:profile,
      publications:publications
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

    const profile = this.state.profile;

    let publications = [];

    function getPublicationsCategoryTitle(category) {
      return Object.entries(category)[0][1];
    }

    function getPublicationBlockYear(publicationBlock) {
      return publicationBlock[0];
    }

    function getPublicationDescription(publication) {
      return publication[1].toString();
    }

    if (!!this.state.publications) {

      publications = this.state.publications.map((item, i) =>
      <div className="section" key={"pub-" + i}>
        <h3 className="text-uppercase">{item.Key}</h3>

        {
          Object.entries(item.Value).map((category,j) =>
          <div key={"pub-cat-" + j}>
            <h4 className="text-uppercase">{getPublicationsCategoryTitle(category)}</h4>

            {
              Object.entries(category[1]).map((publicationBlock, y) =>
              <div key={"publicationBlock" + y}>
                <h5 className="text-uppercase">{getPublicationBlockYear(publicationBlock)}</h5>

                {
                  Object.entries(publicationBlock[1]).map((publication, n)=>
                    <div className="publication" key={"publication-" + n}>
                      {getPublicationDescription(publication)}
                    </div>)
                }

              </div>)
            }

          </div>)
        }

      </div>)
    }

    return (
      <div className="row profile">
        <div className="col-md-3">
          <ProfileAvatar profile={this.state.profile} />
        </div>

        <div className="col-md-9">
          <div className="panel panel-default">
            <h1>{profile.fullName}</h1>
            <div className="panel-body">
              {publications}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default withRouter(ProfilePublications);