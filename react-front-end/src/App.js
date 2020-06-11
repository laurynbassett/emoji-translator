import React, { Component } from 'react';
import './App.css';
import Input from './components/Input';
import Emoji from './components/Emoji';
const emojilib = require('emojilib');
const allEmojis = emojilib.lib;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      emojiTranslation: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.translate = this.translate.bind(this)
  }

  handleChange(evt) {
    console.log("CHANGED INPUT", evt.target.value);
    this.setState({ message: evt.target.value });
                   
    // run recognize & translate fn
    const translation = this.translate(this.state.message)
    // set emojiTranslation on state
    this.setState({ emojiTranslation: translation })
  }
    
  handleSubmit(){
    // run recognize & translate fn
    // set emojiTranslation on state
  }

  // value = {props.emojiTranslation ? props.emojiTranslation: props.message}
  translate(message) {
    console.log('MESSAGE', message)
    const wordsArray = message.split(' ');
    let translatedArray = []; 

    wordsArray.forEach(word => {
      // let emojiChar;
      // console.log('line 45', word)

      if (allEmojis[word]) {
        let emojiChar = allEmojis[word].char;
        translatedArray.push(emojiChar);
      } else {
        translatedArray.push(word);
      }
      
        // for (let emojiWord in allEmojis) {
        //   if (word === emojiWord) {
        //     let emojiChar = allEmojis[emojiWord].char;

        //     translatedArray.push(emojiChar);
        //   } else {
        //     translatedArray.push(word);
        //   }
          // console.log('HERE', translatedArray)
        // }
    })

    return translatedArray.join(' ');
  }
  
  render() {
    return (
      <div className="App">
        <Input handleChange={this.handleChange} value={this.state.message} />
        <Emoji
          emojiTranslation={this.state.emojiTranslation}
          message={this.state.message}
        />
        {/* <Submit handleSubmit={this.handleSubmit}/> */}
      </div>
    );
  }
}

export default App;

