import React, { Component } from 'react';
import './Alphabet.css';
import {Link} from "react-router-dom";

class Alphabet extends Component {
  constructor(props){
    super(props);

    this.state = {
      letter: ''
    };

    this.onLetterClick = this.onLetterClick.bind(this);
  }

  onLetterClick(letter) {
    this.setState({letter});
    if (!!this.props.onSelectLetter){
      this.props.onSelectLetter('startwith:' + letter);
    }
  }

  render() {
    const alphabet = "А Б В Г Д Е Є Ж З И І Ї Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ю Я".split(' ');

    const letters = alphabet.map((item, key) =>
        <Link
          key={item}
          className={ item===this.state.letter ? 'selected': '' }
          to={"/search?q=startwith:" + item}
          onClick={() => this.onLetterClick(item)}
        >
          {item}
        </Link>
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