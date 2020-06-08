import React, { Component } from 'react';
import './SearchResultItem.css';

class SearchResultItem extends Component {
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

  /**
   * Get primary position
   * @param item
   * @returns {string}
   */
  getPosition(item) {
    if (!item || !item.Positions || item.Positions.length === 0) {
      return '';
    }

    return item.Positions[0].Name;
  }

  /**
   * Get primary subdivision
   * @param item
   * @returns {string}
   */
  getSubdivision(item) {
    if (!item || !item.Positions || item.Positions.length === 0) {
      return '';
    }

    return  item.Positions[0].Subdivision.Name;
  }

  render() {

    const item = this.props.item;

    return (
      <div className="col-md-3 d-flex align-items-stretch" key={"uk-" + item.UserIdentifier}>
        <div className="card">
          <a
            href={"/profile/" + item.UserIdentifier}
            className="image">
            <img
              className="card-img-top"
              src={item.Photo}
              alt={item.FullName}
              title={item.FullName} />
          </a>
          <div className="card-body">
            <h5 className="card-title"><a href={"/profile/" + item.UserIdentifier}>{item.FullName}</a></h5>
            <p className="card-text">
              <strong>{this.getPosition(item)}</strong>
              <br />
              {this.getSubdivision(item)}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResultItem;