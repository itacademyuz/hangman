import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import {randomWord} from './words'
class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord(), active: true, won: false};
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart = this.handleRestart.bind(this)
    console.log(this.state.answer);
  }

  guessedWord() {
    if(!this.state.active){
      return this.state.answer
    }
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }
  handleGuess(evt) {
    
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
      active: this.state.nWrong<this.props.maxWrong-1 || this.state.won? true: false,
      won: this.guessedWord().join("")===this.state.answer? true: false
      
    }));
    console.log( Array.from(this.state.guessed).join(''));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    if(this.state.active && !this.state.won){
      return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
        <button className='Hangman-btns'
          key={ltr}
          value={ltr}
          onClick={this.handleGuess}
          disabled={this.state.guessed.has(ltr)}
        >
          {ltr}
        </button>
      ));
    }
    if(this.state.won){
      return <p>You Won! Congratulations</p>
    }
    return <p>You Lose. Try again</p>
  }
  handleRestart(){
    this.setState({
      answer: randomWord(),
      guessed: new Set(),
      nWrong: 0,
      active: true,
      won: false
    });
    console.log(this.state.answer);
  }

  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]}  alt={this.state.nWrong+"/"+6}/>
        <p>Wrong words: {this.state.nWrong}</p>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        {this.generateButtons()}
        <button onClick={this.handleRestart}><i className="fa fa-refresh fa-spin"></i></button>
      </div>
    );
  }
}

export default Hangman;
