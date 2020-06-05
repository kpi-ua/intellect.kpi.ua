import React, { Component } from 'react';
import './Alphabet.css';
import {Link} from "react-router-dom";

class Alphabet extends Component {
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
    const alphabet = "А Б В Г Д Е Є Ж З И І Ї Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ю Я".split(' ');
    // vxar selectedLetter = Convert.ToString(Context.Request.Query["q"] as Object).Replace("startwith:", "").ToUpper();

    const letters = alphabet.map((item, key) =>
        <Link to="/search?q=startwith:{item}">{item}</Link>
    );

    return (
      <div>
        <h3>Алфавiтний покажчик</h3>
        <div className="line"/>
        {letters}
        <div className="line"></div>

      </div>
    );
  }
}

export default Alphabet;