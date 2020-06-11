import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import copy from 'copy-to-clipboard'

class CopyButton extends Component {
  constructor(props) {
    super(props)
    this.state = { copySuccess: '' }
    this.copyToClipboard = this.copyToClipboard.bind(this)
  }

  // TODO: Get correct index to copy
  copyToClipboard = e => {
    console.log('TRANSLATION', this.props.translation)
    // format translation array into string
    const formattedTranslation = this.props.translation
      .map((lineArr, lineIdx) => {
        console.log('LINE ARRAY', lineArr)

        return lineArr
          .map((wordArr, wordIdx) => {
            if (Array.isArray(wordArr)) {
              return wordArr[0]
            } else return wordArr
          })
          .join(' ')
      })
      .join('\n')

    copy(formattedTranslation)
    e.target.focus()
    this.setState({ copySuccess: 'Copied!' })
  }

  render() {
    const { classes } = this.props

    return (
      <div className='copy-button'>
        <Button className={classes.label} onClick={this.copyToClipboard}>
          Copy to Clipboard
        </Button>
        <div className={classes.success}>{this.state.copySuccess}</div>
      </div>
    )
  }
}

const useStyles = theme => ({
  root: {
    flexDirection: 'row',
    textAlign: 'start',
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch'
    }
  },
  label: {
    marginTop: '1rem',
    border: '1px solid #ec407a',
    fontFamily: 'Raleway',
    textTransform: 'none',
    backgroundColor: '#ec407a',
    color: 'white',
    '&:hover': {
      opacity: '0.7',
      backgroundColor: '#ec407a'
    }
  },
  success: {
    marginTop: '1rem',
    marginLeft: '1rem',
    fontSize: '15px',
    color: '#ec407a'
  }
})

export default withStyles(useStyles)(CopyButton)
