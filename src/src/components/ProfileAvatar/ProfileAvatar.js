import React, {Component} from 'react';
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

            if (contact.isEmpty(c)) {
                return;
            }

            if (contact.isEmail(c)) {

                return renderContactBlock(
                    <Icon.Envelope/>,
                    <a target="_blank" href={contact.renderEmailLink(c)}>{c.value}</a>,
                    index
                )
            }

            if (contact.isPhone(c)) {
                return renderContactBlock(
                    <Icon.Phone/>,
                    <a target="_blank" href={contact.renderPhoneLink(c)}>{c.value}</a>,
                    index
                )
            }

            if (contact.isSkype(c)) {
                return renderContactBlock(
                    <Icon.Phone/>,
                    <a target="_blank" href={contact.renderSkypeLink(c)}>{c.value}</a>,
                    index
                )
            }

            if (contact.isWebSite(c)) {
                return renderContactBlock(
                    <Icon.Window/>,
                    <a target="_blank" href={contact.renderWebSiteLink(c)}>{contact.renderWebSiteTitle(c)}</a>,
                    index
                )
            }

            if (contact.isTelegram(c)) {
                return renderContactBlock(
                    <Icon.Telegram/>,
                    <a target="_blank" href={contact.renderTelegramLink(c)}>{c.value}</a>,
                    index
                )
            }

            if (contact.isOrcidId(c)) {
                return renderContactBlock(
                    <Icon.Book/>,
                    <a target="_blank" href={contact.renderOrcidIdLink(c)}>Orcid</a>,
                    index
                )
            }

            if (contact.isAddress(c)) {
                return renderContactBlock(
                    <Icon.Map/>,
                    <a target="_blank" href={contact.renderAddress(c)}>{c.value}</a>,
                    index
                )
            }

            if (contact.isResearchId(c)) {
                return renderContactBlock(
                    <Icon.Book/>,
                    <a target="_blank" href={contact.renderResearchIdLink(c)}>Research</a>,
                    index
                )
            }

            if (contact.isScopusId(c)) {
                return renderContactBlock(
                    <Icon.Book/>,
                    <a target="_blank" href={contact.renderScopusIdLink(c)}>Scopus</a>,
                    index
                )
            }

            if (contact.isGoogleScholarId(c)) {
                return renderContactBlock(
                    <Icon.Book/>,
                    <a target="_blank" href={contact.renderGoogleScholarIdLink(c)}>Google Scholar</a>,
                    index
                )
            }

            return renderContactBlock('', c.value, index)
        }

        return (
            !!profile &&
            <div>
                <img className="img-thumbnail" src={profile.photo} alt={profile.fullName}/>

                <div className="container contacts">
                    {
                        !!profile.contactRecords && profile.contactRecords
                            //.sort((a, b) => a.value > b.value ? -1 : 1)
                            .map((c, index) =>
                                renderContact(c, index)
                            )
                    }
                </div>

                <br/>

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