import React from 'react'
import { Paper, Snackbar, Button } from 'react-md'
import InlineEditor from '../InlineEditor'
import { validateField } from '../../utils/forms'
import useReactRouter from 'use-react-router'

function ItemData (props) {
  const { history } = useReactRouter()

  const eventHandler = {
    handleList: () => history.push(`${props.url}`),
    handleChange: (event, field) => {
      if (props.validators) {
        const errors = { ...props.errors }
        const rules = props.validators[field]
        if (rules) {
          errors[field] = validateField(rules, event)
        }
        props.setErrors(errors)
      }
      props.setData({ ...props.data, [field]: event })
    }
  }

  props = { ...props, ...eventHandler }

  return (
    <Presenter {...props} />
  )
}

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
          <Button
            floating mini
            iconChildren='navigate_before'
            onClick={props.handleList}
            tooltipLabel={props.actionList || 'List'}
          />
          {props.isNew ? props.titleNew : <h2>{props.title}<br />{props.data['name']}</h2>}
          {(props.canDelete && !props.isNew) &&
          <Button
            floating mini
            iconChildren='delete'
            onClick={props.handleDelete}
            tooltipLabel={props.actionDelete || 'Remove'}
          />}
        </div>
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
                onChange={e => props.handleChange(e, element.field)}
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
        <Snackbar id='application-toasts' toasts={props.toasts} onDismiss={props.handleDismiss} />
      </Paper>
    </div>
  </section>

export default ItemData
