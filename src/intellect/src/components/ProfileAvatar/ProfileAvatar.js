import React, { Component } from 'react';
import './ProfileAvatar.css';
import {Button} from "react-bootstrap";

class ProfileAvatar extends Component {
  // constructor(props){
    // super(props);
    // this.state = {};
  // }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    const profile = this.props.profile;

    return (
      <div>
        <span className="thumbnail profile-image">
            <img className="img-thumbnail" src={profile.photo} alt={profile.fullName} />
          </span>

        {!!profile.credo && <h5 className="credo">{profile.credo}</h5>}
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