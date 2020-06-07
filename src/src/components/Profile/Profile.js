import React, { Component } from 'react';
import './Profile.css';
import {
  withRouter,
  matchPath
} from "react-router-dom";
import api from "../../services/api";
import {Button} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import ProfileAvatar from "../ProfileAvatar";

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      profile: {}
    };
  }

  async componentDidMount(){
    const profileId = this.getProfileId();
    const profile = await api.getProfile(profileId);

    this.setState({profile});

  }

  getProfileId() {
    const match = matchPath(this.props.history.location.pathname, {
      path: '/profile/:profileId',
      exact: true,
      strict: false
    });

    return  match.params.profileId
  }

  render() {

    const profile = this.state.profile;
    let positions = [];
    let contactInformation = [];

    if (!!profile.positions) {
      positions = profile.positions.map((p, index) =>
        <div className="row" key={"position-" + index}>
          <div className="col-md-5 title"><a href={p.subdivision.url}>{p.subdivision.name}</a></div>
          <div className="col-md-7">{p.name}</div>
        </div>
      );
    }

    if (!!profile.contactRecords) {
      contactInformation = profile.contactRecords.map((c, index) =>
        <div className="row" key={"contact-record-" + index}>
          <div className="col-md-5 title">{c.name}</div>
          <div className="col-md-7">{c.value}</div>
        </div>
      );
    }

    return (
        <div className="row profile">
          <div className="col-md-3">
            <ProfileAvatar profile={this.state.profile} hideBackLink={true} />
          </div>

          <div className="col-md-9">
            <div className="panel panel-default">
              <h1>{profile.fullName}</h1>
              <div className="panel-heading">
                <h3 className="panel-title">Загальна інформація</h3>
              </div>

              <div className="panel-body">
                  {
                    !!profile.academicDegree &&
                    <div className="row">
                      <div className="col-md-5 title">Науковий ступень</div>
                      <div className="col-md-7">{profile.academicDegree}</div>
                    </div>
                  }
                  {
                    !!profile.academicStatus &&
                    <div className="row">
                      <div className="col-md-5 title">Вчене звання</div>
                      <div className="col-md-7">{profile.academicStatus}</div>
                    </div>
                  }
                  {
                    !!profile.scientificInterest &&
                    <div className="row">
                      <div className="col-md-5 title">Наукові інтереси</div>
                      <div className="col-md-7">{profile.scientificInterest}</div>
                    </div>
                  }
              </div>

              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Дані за місцем роботи</h3>
                </div>

                <div className="panel-body positions">
                    {positions}
                </div>
              </div>

            </div>

            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Контактна інформація</h3>
              </div>
              <div className="panel-body">

                {contactInformation}

                <div className="row">
                  <div className="col-md-5 title">Адреса публічної сторінки</div>
                  <div className="col-md-7">
                    <a href={"https://intellect.kpi.ua/profile/" + profile.userIdentifier}>
                      {"intellect.kpi.ua/profile/" + profile.userIdentifier}
                    </a>

                  </div>
                </div>

              </div>
            </div>

            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Наукова діяльність</h3>
              </div>
              <div className="panel-body">
                <Button
                  size="lg" block
                  variant="outline-success"
                  href={'/profile/' + this.state.profile.userIdentifier + '/publications'}>
                  Публікації
                  &nbsp;
                  <Icon.Newspaper />
                </Button>

                <Button
                  size="lg" block
                  variant="outline-success"
                  href={'/profile/' + this.state.profile.userIdentifier + '/executions'}>
                  Виконання науково-дослідних та дослідно-конструкторських робіт
                  &nbsp;
                  <Icon.XDiamond />
                </Button>

                <Button
                  size="lg" block
                  variant="outline-success"
                  href={'/profile/' + this.state.profile.userIdentifier + '/results'}>
                  Результати виконання науково-дослідних та дослідно-конструкторських робіт
                  &nbsp;
                  <Icon.XDiamondFill />
                </Button>

                <Button
                  size="lg" block
                  variant="outline-success"
                  href={'/profile/' + this.state.profile.userIdentifier + '/conference'}>
                  Конференції, виставки
                  &nbsp;
                  <Icon.People />
                </Button>

                <br />
                <br />
                <br />

              </div>
            </div>

          </div>
        </div>
    );
  }
}

export default withRouter(Profile);