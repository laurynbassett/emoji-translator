import React, { Component } from 'react'
import './App.css'
import { CopyButton, Header, Input, Output, translate } from './components'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      translation: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    console.log('CHANGED INPUT', evt.target.value)
    // run recognize & translate fn
    const translation = translate(evt.target.value)
    console.log('TRANSLATION', translation)
    // set message and translation on state
    this.setState({ message: evt.target.value, translation })
  }

  // TODO: get emojis to show after copying result and pasting into input
  render() {
    return (
      <div className='App'>
        <Header />
        <div className='translator'>
          <div className='input'>
            <div className='input-label'>From Text:</div>
            <Input handleChange={this.handleChange} value={this.state.message} />
          </div>
          <div className='output'>
            <div className='output-label'>Emojified:</div>
            <Output translation={this.state.translation} />
          </div>
          {document.queryCommandSupported('copy') && (
            <div className='copy'>
              <CopyButton translation={this.state.translation} />
            </div>
          )}
        </div>
      </div>
    )
  }
}
