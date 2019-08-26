import React, { useState } from 'react'
import {
  FontIcon,
  TextField
} from 'react-md'

const FilterBar = props => {
  let timeout = null
  const [ state, setState ] = useState({q: ''})

  const setSearch = q => {
    setState({q})
    if (timeout) window.clearTimeout(timeout)
    timeout = window.setTimeout(() => props.filter(q), 500)
  }

  return (
    <section className='md-grid'>
      {props.children}
      {!props.hideSearch &&
        <TextField
          id='searchBox'
          lineDirection='center'
          placeholder='Buscar'
          leftIcon={<FontIcon>search</FontIcon>}
          rightIcon={<FontIcon disabled={!props.value} onClick={() => setSearch('')}>close</FontIcon>}
          className='md-cell--bottom md-cell md-cell--3'
          value={state.q}
          onChange={setSearch}
        />
      }
    </section>
  )
}

export default FilterBar
