import React, { Component } from 'react';
import './ProfileAvatar.css';
import {Button} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

class ProfileAvatar extends Component {

//   if (!!profile.contactRecords) {
//   contactInformation = profile.contactRecords.map((c, index) =>
//     <div className="row" key={"contact-record-" + index}>
//       <div className="col-md-5 title">{c.name}</div>
//       <div className="col-md-7">{c.value}</div>
//     </div>
//   );
// }



  render() {
    const profile = this.props.profile;

    // const email = getPrimaryEmail(profile);
    // const phone = getPrimaryPhone(profile);

    function getIcon(c) {
      if (!c || !c.name) {
        return;
      }

      if (c.name.toLowerCase() === "e-mail") {
        return <Icon.Envelope />
      }

      if (c.name.toLowerCase().includes("телефон")) {
        return <Icon.Phone />
      }
    }

    function formatContactValue(value) {

      if (!value || value.trim().length === '') {
        return '';
      }

      if (value.toLowerCase().includes("@")) {
        return <a href={"mailto:"+value}>{value}</a>
      }
      return value;
    }

    function renderContacts(contactRecords) {

      if (!contactRecords)
      {
        return;
      }

      return contactRecords.map((c, index) =>
       <div className="row">
          <div className="col-md-2">
            {getIcon(c)}
          </div>
          <div className="col-md-10">
            {formatContactValue(c.value)}
          </div>
        </div>
      )
    }

    return (
      <div>
        <img className="img-thumbnail" src={profile.photo} alt={profile.fullName} />

        {!!profile.credo && <h5 className="credo">{profile.credo}</h5>}

        <div className="container contacts">
        {renderContacts(profile.contactRecords)}
        </div>

        <br />
        <Button
          size="lg" block
          variant="outline-success"
          href={'/profile/' + profile.userIdentifier}>
          Повернутися до профілю
          {/*<Icon.ArrowBarLeft />*/}
        </Button>
      </div>
    );
  }
}

export default ProfileAvatar;