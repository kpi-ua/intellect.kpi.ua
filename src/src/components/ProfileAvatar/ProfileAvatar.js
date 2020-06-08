import React, { Component } from 'react';
import './ProfileAvatar.css';
import {Button} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

class ProfileAvatar extends Component {

  render() {
    const profile = this.props.profile;

    function renderContactBlock(title, value, index) {

      return <div className="row" key={"cr-" + index}>
              <div className="col-2">
                {title}
              </div>
              <div className="col-10">
                {value}
              </div>
            </div>;
    }

    function renderContact(c, index) {

      if (!c || !c.name) {
        return;
      }

      if (c.name.toLowerCase().includes("e-mail")) {

        return renderContactBlock(
          <Icon.Envelope />,
          <a href={"mailto:" + c.value}>{c.value}</a>,
          index
        )
      }

      if (c.name.toLowerCase().includes("телефон")) {
        return renderContactBlock(
          <Icon.Phone />,
          <a href={"tel:" + c.value}>{c.value}</a>,
          index
        )
      }

      if (c.name.toLowerCase().includes("skype")) {
        return renderContactBlock(
          <Icon.Phone />,
          <a href={"skype:" + c.value}>{c.value}</a>,
          index
        )
      }

      if (c.name.toLowerCase().includes("сайт")) {
        return renderContactBlock(
          <Icon.Window />,
          <a target="_website" href={c.value}>{c.value.replace('https://', '').replace('http://', '')}</a>,
          index
        )
      }

      return renderContactBlock(
        '',
        c.value,
        index
      )
    }

    return (
      !!profile &&
      <div>
        <img className="img-thumbnail" src={profile.photo} alt={profile.fullName} />

        <div className="container contacts">
          {
            !!profile.contactRecords &&  profile.contactRecords.map((c, index) =>
              renderContact(c, index)
            )
          }
        </div>

        <br />

        {
          !this.props.hideBackLink &&

          <Button
            size="lg" block
            variant="outline-success"
            href={'/profile/' + profile.userIdentifier}>
            Повернутися до профілю
            {/*<Icon.ArrowBarLeft />*/}
          </Button>
        }
      </div>
    );
  }
}

export default ProfileAvatar;