import React, { Component } from 'react';
import './ProgressBar.css';

class ProgressBar extends Component {

  render() {
    return (
      <div className="in-progress">
        <img
          alt="Work in progress..."
          src="/images/loading.gif"
        />
      </div>
    );
  }
}

export default ProgressBar;