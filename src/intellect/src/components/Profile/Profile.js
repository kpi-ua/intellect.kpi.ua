import React, { Component } from 'react';
import './Profile.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  withRouter,
  matchPath
} from "react-router-dom";
import api from "../../services/api";

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      profile: {}
    };
  }

  // componentWillMount(){}
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

// componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

// {

//   "fields": {
//     "UserContactValue": "204 - 80 - 06 ",
//     "IsVisible": "0",
//     "ReceptionHours": "пн.-вт. 10.00-14.00",
//     "SubdivName": "Кафедра технiчної кiбернетики ФІОТ",
//     "DutiesName": "Доцент",
//     "DutiesSubTypeName": "",
//     "GroupName": "",
//     "SexName": "Жіноча    ",
//     "StudyYear": "2010-2011",
//     "WorkKindNMNIOV2": "публікації статті у наукових виданнях",
//     "WorkKind": "вітчизняних фахових",
//     "NameWorkKind": "Писаренко В. Г., Писаренко Ю. В., Мелкумян Е. Ю., Коваль А. С. , Концепция и базовые компоненты интеллекуального мобильного робота для горноспасательных работ // Компютерні засоби, мережі та системи 2010. - № 9"
//   },
//   "status": null,
//   "items": null,


//   "isConfirmed": false,
//   "userIdentifier": "mky",

//   "profile": "https://intellect.kpi.ua/profile/mky",
//   "id": 81
// }

  render() {

    const profile = this.state.profile;
    let positions = [];
    let contactInformation = [];

    if (!!profile.positions) {
      positions = profile.positions.map((p, index) =>
          <tr>
            <td><a href={p.subdivision.url}>{p.subdivision.name}</a></td>
            <td>{p.name}</td>
          </tr>
      );
    }

    if (!!profile.contactRecords) {
      contactInformation = profile.contactRecords.map((c, index) =>
          <tr>
            <td>{c.name}</td>
            <td>{c.value}</td>
          </tr>
      );
    }

    return (
        <div class="row profile">
          <div class="col-md-3">
            <a href="#" class="thumbnail profile-image">
              <img class="img-thumbnail" src={profile.photo} alt={profile.fullName} />
            </a>

            {!!profile.credo && <h5 className="credo">{profile.credo}</h5>}
          </div>

          <div class="col-md-9">
            <div class="panel panel-default">
              <h2>{profile.fullName}</h2>
              <div class="panel-heading">
                <h3 class="panel-title">Загальна інформація</h3>
              </div>

              <div className="panel-body">
                <table className="table table-responsive table-hover table-striped common_info">
                  <tbody>
                  {
                    !!profile.academicDegree &&
                    <tr>
                      <td>Науковий ступень</td>
                      <td>{profile.academicDegree}</td>
                    </tr>
                  }

                  {
                    !!profile.academicStatus &&
                    <tr>
                      <td>Вчене звання</td>
                      <td>{profile.academicStatus}</td>
                    </tr>
                  }
                  {
                    !!profile.scientificInterest &&
                    <tr>
                      <td>Наукові інтереси</td>
                      <td>{profile.scientificInterest}</td>
                    </tr>
                  }
                  </tbody>
                </table>
              </div>

              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Дані за місцем роботи</h3>
                </div>

                <table className="table table-responsive table-hover table-striped workplace">
                  <tbody>
                    {positions}
                  </tbody>
                </table>
              </div>

            </div>

            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">Контактна інформація</h3>
              </div>
              <div class="panel-body">

                <table class="table table-responsive table-hover table-striped contact_info">
                  <tbody>
                  {contactInformation}
                  </tbody>
                {/*  @Html.Partial("RecordPartialView", new Record("Особиста сторiнка", ViewBag.Link))*/}

                {/*  @Html.Partial("RecordPartialView", new Record("Електронна пошта", Model.GetField("Email")))*/}
                {/*  @foreach (Record item in @Model.ContactRecords)*/}
                {/*  {*/}
                {/*  @Html.Partial("RecordPartialView", new Record(item.Name, item.Value))*/}
                {/*  }*/}
                </table>
              </div>
            </div>

            <div class="panel panel-default" id="science">
              <div class="panel-heading">
                <h3 class="panel-title">Наукова діяльність ...</h3>
              </div>
              <div class="panel-body">
                <ul class="profile_subsections">
                  <li id="execution_subsection"><a href="/profile/@ViewBag.ProfileName/execution">Виконання НДДКР</a></li>
                  <li id="results_subsection"><a href="/profile/@ViewBag.ProfileName/results">Результати виконання НДДКР</a></li>
                  <li id="publications_subsection"><a href="/profile/@ViewBag.ProfileName/publications">Публікації</a></li>
                  <li id="conference_subsection"><a href="/profile/@ViewBag.ProfileName/conference">Конференції, виставки</a></li>
                </ul>
              </div>
            </div>

            <div class="panel panel-default" id="awards">
              <div class="panel-heading">
                <h3 class="panel-title">Нагороди/Державні премії ...</h3>
              </div>
              <div class="panel-body">
                <div id="awards-text">

                </div>

                {/*<script>*/}
                {/*  $(function () {*/}
                {/*  $("#awards > .panel-body").hide();*/}
                {/*  $("#awards > .panel-heading").click(function () {*/}
                {/*  $("#awards > .panel-body").toggle();*/}
                {/*});*/}
                {/*});*/}
                {/*</script>*/}

              </div>
            </div>

          </div>
        </div>
    );
  }
}

export default withRouter(Profile);