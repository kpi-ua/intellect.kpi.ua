import React, { Component } from 'react';
import './ProfileAvatar.css';
import {Button} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import ContactHelper from "../../services/contactHelper";

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

      let contact = new ContactHelper();

      if (!c || !c.name || !c.value || c.value.trim() === '') {
        return;
      }

      if (contact.isEmail(c)) {

        return renderContactBlock(
          <Icon.Envelope />,
          <a href={"mailto:" + c.value}>{c.value}</a>,
          index
        )
      }

      if (contact.isPhone(c)) {
        return renderContactBlock(
          <Icon.Phone />,
          <a href={"tel:" + c.value}>{c.value}</a>,
          index
        )
      }

      if (contact.isSkype(c)) {
        return renderContactBlock(
          <Icon.Phone />,
          <a href={"skype:" + c.value}>{c.value}</a>,
          index
        )
      }

      if (contact.isWebSite(c)) {
        return renderContactBlock(
          <Icon.Window />,
          <a target="_website" href={c.value}>{c.value.replace('https://', '').replace('http://', '')}</a>,
          index
        )
      }

      if (contact.isTelegram(c)){
        return renderContactBlock(
            <Icon.Telegram />,
            <a target="_tg" href={"https://t.me/" + c.value.replace("@", "")}>{c.value}</a>,
            index
        )
      }

      if (contact.isOrcidId(c)){
        return renderContactBlock(
            <Icon.Book />,
            <a target="_orcid" href={"https://orcid.org/" + c.value}>Orcid</a>,
            index
        )
      }

      if (contact.isResearchId(c)){
        return renderContactBlock(
            <Icon.Book />,
            <a target="_researcher" href={"https://publons.com/researcher/" + c.value}>Research</a>,
            index
        )
      }

      if (contact.isScopusId(c)){
        return renderContactBlock(
            <Icon.Book />,
            <a target="_scopus" href={"https://www.scopus.com/authid/detail.uri?authorId=" + c.value}>Scopus</a>,
            index
        )
      }

      if (contact.isGoogleScholarid(c)){
        return renderContactBlock(
            <Icon.Book />,
            <a target="_tg" href={"https://scholar.google.ru/citations?user=" + c.value}>Google Scholar</a>,
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