import React, {Component} from 'react';
import './Profile.css';
import {
    withRouter,
    matchPath
} from "react-router-dom";
import api from "../../services/api";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import ProfileAvatar from "../ProfileAvatar";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {}
        };
    }

    async componentDidMount() {
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

        return match.params.profileId
    }

    render() {

        const profile = this.state.profile;

        function generalInformationExist(profile) {
            return !!profile && (
                !!profile.academicDegree ||
                !!profile.academicStatus ||
                !!profile.scientificInterest);
        }

        function employerInformationExist(profile) {
            return !!profile && !!profile.positions && profile.positions.length > 0;
        }

        function renderTooltip(value, tooltip) {
            return <OverlayTrigger
                placement="right"
                delay={{show: 250, hide: 400}}
                overlay={(props) => {
                    return <Tooltip {...props}> {tooltip} </Tooltip>
                }}
            >
                <span className="label-with-tooltip">{value}</span>
            </OverlayTrigger>
        }

        function renderPositionOrDegree(name) {
            name = !name ? '' : name.trim();

            name = name.replaceAll("NULL", "").trim();

            if (name === "Доцент") {
                return renderTooltip(name, "В Україні та інших країнах вчене звання викладачів закладів вищої освіти, що виконують функцію університетських лекторів; вчене звання співробітників наукових установ; посада в закладах вищої освіти. Учене звання доцента присвоюється ученими радами. Звання доцента засвідчується атестатом, що видає Міністерство освіти України. ")
            }

            if (name === "Професор") {
                return renderTooltip(name, "Вчене звання і посада викладача закладу вищої освіти чи наукового співробітника науково-дослідної установи.")
            }

            if (name === "Науковий співробітник") {
                return renderTooltip(name, "Вчене звання старшого наукового співробітника в Україні присвоювалося докторам і кандидатам наук із стажем наукової роботи не менше трьох років, які працювали у вищих навчальних закладах III—IV рівня акредитації або наукових установах та організаціях до них прирівняних і зараховані після обрання за конкурсом чи в порядку атестації.")
            }

            if (name === "Кандидат наук") {
                return renderTooltip(name, "Науковий ступінь кандидата наук присуджується спеціалізованою вченою радою на підставі прилюдного захисту дисертації та затверджується Міністерством освіти і науки України з урахуванням висновку відповідної експертної ради.  Прирівнюється до ступеня доктора філософії.")
            }

            if (name === "Викладач Старший") {
                return renderTooltip(name, "Викладацька посада у закладах вищої освіти, що займає проміжне положення між асистентом і доцентом. Старші викладачі можуть самостійно читати курси лекцій та приймати заліки та іспити.")
            }

            return name
        }

        function renderPositions(profile) {

            if (employerInformationExist(profile)) {

                return profile.positions.map((p, index) =>
                    <div className="row" key={"position-" + index}>
                        <div className="col-md-5 title">
                            <a target="_subdivision" href={p.subdivision.url}>{p.subdivision.name}</a>
                        </div>
                        <div className="col-md-7">{renderPositionOrDegree(p.name)}</div>
                    </div>
                );
            }

            return null;
        }

        return (

            <div className="row">
                <div className="col-md-3">
                    <ProfileAvatar profile={this.state.profile} hideBackLink={true}/>
                </div>

                <div className="col-md-9 profile-information">
                    <h1>{profile.fullName}</h1>

                    {!!profile.credo && <h5 className="credo">{profile.credo}</h5>}

                    {generalInformationExist(profile) &&
                        <section>
                            <h4>Загальна інформація</h4>

                            {
                                !!profile.academicDegree &&
                                <div className="row">
                                    <div className="col-md-5 title">Науковий ступень</div>
                                    <div className="col-md-7">{renderPositionOrDegree(profile.academicDegree)}</div>
                                </div>
                            }
                            {
                                !!profile.academicStatus &&
                                <div className="row">
                                    <div className="col-md-5 title">Вчене звання</div>
                                    <div className="col-md-7">{renderPositionOrDegree(profile.academicStatus)}</div>
                                </div>
                            }
                            {
                                !!profile.scientificInterest &&
                                <div className="row">
                                    <div className="col-md-5 title">Наукові інтереси</div>
                                    <div className="col-md-7">{profile.scientificInterest}</div>
                                </div>
                            }

                            <div className="row">
                                <div className="col-md-5 title">Адреса публічної сторінки</div>
                                <div className="col-md-7">
                                    <a href={"https://intellect.kpi.ua/profile/" + profile.userIdentifier}>
                                        {"intellect.kpi.ua/profile/" + profile.userIdentifier}
                                    </a>
                                </div>
                            </div>

                        </section>
                    }

                    {employerInformationExist(profile) &&
                        <section>
                            <h4>Дані за місцем роботи</h4>
                            {renderPositions(profile)}
                        </section>
                    }

                    <section>
                        <h4>Наукова діяльність</h4>

                        <Button
                            size="lg" block
                            variant="outline-success"
                            href={'/profile/' + this.state.profile.userIdentifier + '/publications'}>
                            Публікації
                            &nbsp;
                            <Icon.Newspaper/>
                        </Button>

                        <Button
                            size="lg" block
                            variant="outline-success"
                            href={'/profile/' + this.state.profile.userIdentifier + '/executions'}>
                            Виконання науково-дослідних та дослідно-конструкторських робіт
                            &nbsp;
                            <Icon.XDiamond/>
                        </Button>

                        <Button
                            size="lg" block
                            variant="outline-success"
                            href={'/profile/' + this.state.profile.userIdentifier + '/results'}>
                            Результати виконання науково-дослідних та дослідно-конструкторських робіт
                            &nbsp;
                            <Icon.XDiamondFill/>
                        </Button>

                        <Button
                            size="lg" block
                            variant="outline-success"
                            href={'/profile/' + this.state.profile.userIdentifier + '/conference'}>
                            Конференції, виставки
                            &nbsp;
                            <Icon.People/>
                        </Button>
                    </section>

                    <br/>
                    <br/>
                    <br/>

                </div>
            </div>
        );
    }
}

export default withRouter(Profile);