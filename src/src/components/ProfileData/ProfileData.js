import React, { Component } from 'react';
import './ProfileData.css';

class ProfileData extends Component {
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

    let records = [];

    function getCategoryTitle(category) {
      return Object.entries(category)[0][1];
    }

    function getBlockYear(publicationBlock) {
      return publicationBlock[0];
    }

    function getDescription(publication) {
      return publication[1].toString();
    }

    if (!!this.props.records) {

      records = this.props.records.map((item, i) =>
        <div className="section" key={"pub-" + i}>
          <h3 className="text-uppercase">{item.Key}</h3>

          {
            Object.entries(item.Value).map((category,j) =>
              <div key={"category-" + j}>
                <h4 className="text-uppercase">{getCategoryTitle(category)}</h4>

                {
                  Object.entries(category[1]).map((block, y) =>
                    <div key={"block" + y}>
                      <h5 className="text-uppercase">{getBlockYear(block)}</h5>

                      {
                        Object.entries(block[1]).map((x, n)=>
                          <div className="publication" key={"x-" + n}>
                            {getDescription(x)}
                          </div>)
                      }

                    </div>)
                }

              </div>)
          }

        </div>)
    }

    return (
      <div>{records}</div>
    );
  }
}

export default ProfileData;