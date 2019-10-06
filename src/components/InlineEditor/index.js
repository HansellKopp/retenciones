import React, { Fragment } from 'react'
import { TextField, Switch, DatePicker, SelectField, FontIcon } from 'react-md'
import SelectSupplier from '../SelectSupplier'
import './_style.scss'

const dbDateToDate = (value) => {
  return value ? new Date(value) : null
}

const InlineEditor = ({ element, onChange, value, defaultValue, error, handleChangeName }) => {
  return (<Fragment>
    { (element.type === 'text' || element.type === 'json') &&
      <TextField
        disabled={!element.edit}
        id={element.field}
        name={element.field}
        label={element.label}
        value={value || ''}
        defaultValue={defaultValue}
        error={(!!error)}
        errorText={error}
        className={`${element.className} text-field`}
        rightIconStateful
        onChange={onChange}
        rightIcon={element.rightIcon ? <FontIcon>{element.rightIcon}</FontIcon> : null}
      />
    }
    { element.type === 'password' &&
      <TextField
        id={element.field}
        name={element.field}
        label={element.label}
        value={value || ''}
        error={(!!error)}
        errorText={error}
        className={`${element.className} text-field`}
        onChange={onChange}
        type='password'
      />
    }
    { element.type === 'email' &&
      <TextField
        id={element.field}
        name={element.field}
        label={element.label}
        value={value || ''}
        error={(!!error)}
        errorText={error}
        className={`${element.className} text-field`}
        onChange={onChange}
        rightIcon={<FontIcon>email</FontIcon>}
      />
    }
    { (element.type === 'multi-line') &&
    <TextField
      id={element.field}
      name={element.field}
      label={element.label}
      value={value || ''}
      defaultValue={defaultValue}
      error={(!!error)}
      errorText={error}
      className={`${element.className} text-field`}
      rightIconStateful
      onChange={onChange}
      rows={element.rows}
    />
    }
    { (element.type === 'number' || element.type === 'money' || element.type === 'years') &&
      <TextField
        id={element.field}
        name={element.field}
        label={element.label}
        value={value || ''}
        defaultValue={defaultValue}
        error={(!!error)}
        errorText={error}
        className={`${element.className} numeric-field`}
        onChange={onChange}
        disabled={!element.edit}
        type='number'
      />
    }
    { (element.type === 'percent') &&
      <TextField
        id={element.field}
        name={element.field}
        label={element.label}
        value={value ? value * 100:''}
        defaultValue={defaultValue}
        error={(!!error)}
        errorText={error}
        className={element.className}
        rightIcon={(<FontIcon>%</FontIcon>)}
        onChange={(v) => onChange(v / 100)}
        type='number'
      />
    }
    { element.type === 'boolean' &&
      <Switch
        id={element.field}
        name={element.field}
        label={element.label}
        className={element.className}
        defaultChecked={defaultValue}
        checked={value}
        value='1'
        labelBefore
        onChange={onChange}
      />
    }
    { element.type === 'date' &&
      <DatePicker
        id={element.field}
        name={element.field}
        label={element.label}
        error={(!!error)}
        errorText={error}
        locales='es-ES'
        firstDayOfWeek={1}
        formatOptions={{
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }}
        value={dbDateToDate(value)}
        onChange={(v) => {
          let splitDate = v.split('/')
          onChange(splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0])
        }}
        onSelect={(v) => {
          let splitDate = v.split('/')
          onChange(splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0])
        }}
        defaultValue={defaultValue}
        icon={null}
        rightIcon={<FontIcon>event</FontIcon>}
        className={`date-field ${element.className}`}
      />
    }
    { (element.type === 'select') &&
      <SelectField
        id={element.field}
        name={element.field}
        label={element.label}
        menuItems={element.items ? element.items.split(',').map(s => ({ label: s, value: s })) : []}
        value={value || ''}
        onChange={onChange}
        defaultValue={defaultValue}
        error={(!!error)}
        errorText={error}
        className={`${element.className} select-field`}
        sameWidth
      />
    }
    {(element.type === 'select-supplier') &&
      <SelectSupplier
          id={element.field}                                          
          onChange={onChange}
          onAutocomplete={handleChangeName}
          value={value || ''}
          label={element.label}
          allowAdd={element.allowAdd}
          className={element.className}
          defaultValue={element.defaultValue}
      />
}
  </Fragment>)
}

export default InlineEditor
