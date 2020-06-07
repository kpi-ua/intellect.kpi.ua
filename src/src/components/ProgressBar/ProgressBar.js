import React, { Component } from 'react';
import './ProgressBar.css';

class ProgressBar extends Component {

  constructor(props){
    super(props);
    this.state = {
      profile: {},
      publications: [],
      loading: true
    };
  }

  render() {

    if (!!this.props.visible)
    {
      return (
        <div className="row">
          <div className="col-md-12 in-progress">
            <img
              alt="Work in progress..."
              src="/images/loading.gif"
            />
          </div>
        </div>
      );
    }

    return null;
  }
}

export default ProgressBar;