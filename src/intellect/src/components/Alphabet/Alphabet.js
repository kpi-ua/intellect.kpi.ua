import React, { Component } from 'react';
import './Alphabet.css';
import {Link} from "react-router-dom";

class Alphabet extends Component {
  constructor(props){
    super(props);

    this.state = {};

    this.onLetterClick = this.onLetterClick.bind(this);
  }


  onLetterClick(letter){
    debugger

    if (!!this.props.onSelectLetter){
      this.props.onSelectLetter(letter);
    }
  }

  render() {
    const alphabet = "А Б В Г Д Е Є Ж З И І Ї Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ю Я".split(' ');
    // vxar selectedLetter = Convert.ToString(Context.Request.Query["q"] as Object).Replace("startwith:", "").ToUpper();

    const letters = alphabet.map((item, key) =>
        <Link to={"/search?q=startwith:" + item} onClick={() => this.onLetterClick(item)}>{item}</Link>
    );

    return (
      <div>
        <h3>Алфавiтний покажчик</h3>
        <div className="line"/>
        {letters}
        <div className="line"/>

      </div>
    );
  }
}

export default Alphabet;