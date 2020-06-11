import React, { useState } from 'react'
import { MenuItem, Select as Selector } from '@material-ui/core'

export default function Select(props) {
  const { emojis } = props

  const [ selectedEmoji, setSelectedEmoji ] = useState(emojis[0])

  const handleChange = event => {
    setSelectedEmoji(event.target.value)
  }

  return (
    <Selector value={selectedEmoji} onChange={handleChange}>
      {emojis.map((emoji, i) => {
        return (
          <MenuItem key={i} value={emoji}>
            {emoji}
          </MenuItem>
        )
      })}
    </Selector>
  )
}
