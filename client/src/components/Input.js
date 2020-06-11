import React from 'react'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch'
    },
    '& .MuiOutlinedInput-root': {
      fontFamily: 'Raleway',
      color: '#616161',
      '& fieldset': {
        borderColor: '#ececec'
      },
      '&:hover fieldset': {
        borderColor: '#29b6f6'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#29b6f6',
        borderWidth: '1px'
      }
    }
  },
  label: {
    fontFamily: 'Raleway'
  }
}))

export default function Input(props) {
  const { handleChange, value } = props
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <TextField
        id='standard-basic'
        placeholder='Type Something...'
        type='text'
        value={value}
        multiline={true}
        rows={5}
        variant='outlined'
        inputProps={{ spellCheck: 'false' }}
        onChange={handleChange}
      />
    </form>
  )
}
