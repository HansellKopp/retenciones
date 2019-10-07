import React, { useState } from 'react'
import { Paper, Snackbar, Button, DialogContainer, FontIcon } from 'react-md'
import InlineEditor from '../InlineEditor'
import Spinner from '../Spinner'
import { validateField } from '../../utils/forms'
import useReactRouter from 'use-react-router'

import './_style.scss'

function ItemData (props) {
  const { history } = useReactRouter()
  const [ showDialog, setDialog ] = useState(false)

  const eventHandler = {
    handleList: () => history.push(`${props.url}`),
    handleChange: (event, element) => {
      const field = element.field
      if (props.validators) {                  
        const errors = { ...props.errors }
        const rules = props.validators[field]
        if (rules) {
          errors[field] = validateField(rules, event)
        }
        props.setErrors(errors)
      }
      let newData = { ...props.data, [field]: event }
      if(element.effect) {
        newData = element.effect(newData, field)
      }
      props.setData(newData)
    },
    handleChangeName: ( name, rif ) => {
      props.setData({ ...props.data, name, rif })
    },
    handleDismiss: () => {
      if (props.toasts[0].onDismiss) {
        props.toasts[0].onDismiss()
      }
      props.setData({ ...props.data, toasts: []})
    },
    handleToggle: () => {
      setDialog(!showDialog)
    }
  }

  props = { ...props, ...eventHandler, showDialog }

  return (
    <Presenter {...props} />
  )
}

const Dialog = props => {

  const actions = [{
    id: 'dialog-cancel',
    secondary: true,
    children: 'Cancelar',
    onClick: () => props.handleToggle(),
  }, {
    id: 'dialog-ok',
    primary: true,
    children: 'Ok',
    onClick: () => {
      props.handleDelete()
      props.handleToggle()
    },
  }]

  return (
  <DialogContainer
    id="focus-control-dialog"
    title={<div class="title"><FontIcon inherit>warning</FontIcon><span>Alerta</span></div> }
    visible={props.showDialog}
    actions={actions}
    onHide={props.handleToggle}
    dialogClassName="dialog-title"
  >
    <span>Realmente desea eliminar este registro ?</span>
  </DialogContainer>)
}

const Form = props => 
<form onSubmit={props.handleSubmit} >
<Paper className='md-grid fieldset'>
  {props.fields.map(element =>
    <InlineEditor
      element={element}
      id={element.field}
      name={element.field}
      key={element.field}
      value={props.data[element.field]}
      error={props.errors[element.field]}
      defaultValue={element.defaultValue ? element.defaultValue() : null}
      onChange={e => props.handleChange(e, element)}
      onBlur={element.onBlur}
      handleChangeName={props.handleChangeName}
    />
  )}
</Paper>
<hr className='md-divider' />
<div className='buttons-container'>
  <Button raised onClick={props.handleList} iconBefore iconChildren='clear'>
    {props.actionCancel || 'Cancel'}
  </Button>
  { (props.canCreate && props.isNew) &&
  <Button raised primary iconChildren='check' type='submit'>
    {props.actionCreate || 'Create'}
  </Button>
  }
  { (props.canUpdate && !props.isNew) &&
  <Button raised primary iconChildren='check' type='submit'>
    {props.actionUpdate || 'Save'}
  </Button>
  }
</div>
</form>

const Presenter = (props) =>
  <section className='md-grid md-grid--40-16'>
    <div className='md-cell md-cell--12'>
      <Paper
        key='1'
        zDepth={1}
        raiseOnHover={false}
        className='mainpaper md-background--card'
      >
        <div className='buttons-container'>
          {props.actionList &&
          <Button
            floating mini
            iconChildren='navigate_before'
            onClick={props.handleList}
            tooltipLabel={props.actionList || 'List'}
          />}
          {props.isNew ? props.titleNew : <h2>{props.title}<br />{props.data['name']}</h2>}
          {(props.canDelete && !props.isNew) &&
          <Button
            floating mini
            iconChildren='delete'
            onClick={props.handleToggle}
            tooltipLabel={props.actionDelete || 'Remove'}
          />}
        </div>
        {props.data ? 
          <>
            <Dialog {...props} />
            <Form {...props} />
            <Snackbar id='application-toasts' toasts={props.toasts} onDismiss={props.handleDismiss} />
          </>
        :
          <Spinner />
        }
      </Paper>
    </div>
  </section>

export default ItemData
