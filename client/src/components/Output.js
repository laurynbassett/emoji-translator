import React, { createElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Select } from '.'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'start',
    marginTop: '1rem',
    minHeight: '3ch',
    lineHeight: '30pt',
    fontWeight: '300',
    color: '#757575',
    '& > *': {
      margin: theme.spacing(1),
      fontSize: '22px'
    }
  }
}))
export default function Output(props) {
  const { translation } = props
  const classes = useStyles()

  console.log('TRANSLATION', translation)
  return (
    <div className={classes.root}>
      <div>
        {translation.map((lineArr, lineIdx) => {
          console.log('LINE', lineArr)

          return (
            <div key={lineIdx}>
              {lineArr.map((wordArr, wordIdx) => {
                console.log('WORD', wordArr)
                console.log('WORD TYPE', typeof wordArr)

                let result = ''

                // if word was kept as string, return as string
                // if work was converted to emoji w/ single option, return single option
                // if word was converted to emoji w/ multiple options, convert to select element

                if (typeof wordArr === 'string') {
                  result += wordArr
                } else if (wordArr.length === 1) {
                  result = wordArr[0]
                } else {
                  result = <Select key={wordIdx} emojis={wordArr} />
                }

                // if not last word in line add space
                if (lineIdx < lineArr.length - 1) {
                  console.log('RESULT 1', result)
                  return <span key={wordIdx}>{result} </span>
                } else {
                  console.log('RESULT 3', result)
                  return <span key={wordIdx}>{result}</span>
                }
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
