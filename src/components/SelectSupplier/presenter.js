import React from 'react'

import './style.scss'
import { Autocomplete } from 'react-md'

const Presenter = props =>
    <>
      <Autocomplete
        label="Rif"
        filter={null}
        id="select-supplier"
        placeholder="proveedor"
        data={props.items}
        value={props.value}
        clearOnAutocomplete    
        defaultValue={props.defaultValue}
        onChange={props.handleSearch}
        onAutocomplete={props.handleAutocomplete}
        className={props.className}
      />
    </>
  

export default Presenter