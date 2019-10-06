import React, { useState, useEffect } from 'react'
import useReactRouter from 'use-react-router'
import { hasPermission } from '../../utils'
import Presenter from './presenter'
import { DbService } from '../../service/dbService'
import { useStateValue } from '../../state'
const service = new DbService('Parameters')

const options = {
  url: '/',
  title: 'Parametro',
  titleNew: 'Nuevos parametros',
  actionList: null,
  actionDelete: null,
  actionCancel: 'Cancelar',
  actionCreate: 'Crear',
  actionUpdate: 'Actualizar',
  addNew: null,
  deleted: null,
  saved: 'Parametros guardados correctamente',
  continue: 'Continuar',
  canCreate: hasPermission('parametros_create'),
  canUpdate: hasPermission('parametros_update'),
  canDelete: false,
  fields: [
    {field: 'rif', label: 'Cedula Rif', type: 'text', edit: true, className: 'md-cell md-cell--6'},
    {field: 'name', label: 'Razon Social', type: 'text', edit: true,  className: 'md-cell md-cell--6'},
    {field: 'address', label: 'Direccion', type: 'text', edit: true, className: 'md-cell md-cell--12'},
    {field: 'period', label: 'Periodo', type: 'number', edit: true, className: 'md-cell md-cell--6'},
    {field: 'aliquot', label: 'Alicuota', type: 'number', edit: true, className: 'md-cell md-cell--2'},
    {field: 'vaucher', label: 'Ultimo Comprobante', type: 'number', edit: true, className: 'md-cell md-cell--2'},
    {field: 'percentage', label: 'Porcentaje Retencion', type: 'number', edit: true, className: 'md-cell md-cell--2'}
  ],
  defaultState: { data:{}, toasts:[], loading: true, isNew: true },
  errors: []
}

function Container () {
  const [state, setState] = useState(options.defaultState)
  // eslint-disable-next-line no-unused-vars
  const [{ parameters }, dispatch] = useStateValue();
  const { history, match } = useReactRouter()
  const id = match.params.id

  useEffect(() => {
    async function fetchData () {
      try {
        if(id !== 'new') {
          const data = await service.getItemById(id)
          setState({ ...options.defaultState, data ,loading: false, isNew: false})
        } else {
          setState({ ...options.defaultState, loading: false})
        }
      } catch (ex) {
        console.error(ex)
      }
    }
    fetchData()
  }, [id])

  const setToast = toasts => {
    setState({ ...state, toasts })
  }

  const eventHandler = {
    handleSubmit: async e => {
      e.preventDefault()
      if (state.isNew) {
        const newItem = await service.addItem(state.data)
        if(newItem.length) {
          const newId = newItem[0].id
          setToast([{text: props.saved,
            action: options.continue,
            onDismiss: () => history.push(`${options.url}/${newId}`)
          }])
        }
      } else {
        const item = await service.updateItemById(id, state.data)
        if(item) {
          setToast([{text: props.saved,
            action: options.continue,
            onDismiss: () => {
              dispatch({
                type: 'updateParameters',
                parameters: { ...state.data, loading: false }
              })
              history.push(`${options.url}`)
            }
          }])
          return
        }
      }
    },
    setData: data => {
      setState({ ...state, data })
    },
    handleDismiss: () => {},
  }

  const props = { ...options, ...state, ...eventHandler }

  return (
    <Presenter {...props} />
  )
}

export default Container
