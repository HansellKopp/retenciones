import React, { useState, useEffect } from 'react'
import useReactRouter from 'use-react-router'
import { hasPermission } from '../../utils'
import Presenter from './presenter'
import { DbService } from '../../service/dbService'
const service = new DbService('Suppliers')

const options = {
  url: '/suppliers',
  title: 'Proveedor',
  titleNew: 'Nuevo proveedor',
  actionList: 'Proveedores',
  actionDelete: 'Eliminar',
  actionCancel: 'Cancelar',
  actionCreate: 'Crear',
  actionUpdate: 'Actualizar',
  addNew: 'Crear proveedor',
  loading: false,
  toasts: [],
  canCreate: hasPermission('supplier_create'),
  canUpdate: hasPermission('supplier_update'),
  canDelete: hasPermission('supplier_delete'),
  fields: [
    {field: 'rif', label: 'Cedula Rif', type: 'text', edit: true, className: 'md-cell md-cell--6'},
    {field: 'name', label: 'Razon Social', type: 'text', edit: true,  className: 'md-cell md-cell--6'},
    {field: 'address', title: 'Direccion', type: 'text', edit: true, className: 'md-cell md-cell--12'},
    {field: 'phone', title: 'Telefono', type: 'text', edit: true, className: 'md-cell md-cell--6'}
  ],
  handleList: () => { console.log('handleList') },
  handleSubmit: () => { console.log('Submit') },
  handleChange: (e, v) => { console.log(e, v) },
  handleDismiss: () => { },
  errors: []
}

function Container () {
  const [data, setData] = useState()
  const { history, match } = useReactRouter()
  const id = match.params.id
  const isNew = (id === 'new')

  useEffect(() => {
    async function fetchData () {
      try {
        const item = await service.getItemById(id)
        setData(item)
      } catch (ex) {
        console.error(ex)
      }
    }
    if (!isNew) {
      fetchData()
    }
  }, [id, isNew])

  const eventHandler = {
    handleDelete: async () => {
      await service.removeItem(id)
      history.push(`${options.url}`)
    },
    handleSubmit: async e => {
      e.preventDefault()
      if (isNew) {
        await service.addItem(data)
      } else {
        await service.updateItemById(id, data)
      }
      history.push(`${options.url}`)
    }
  }

  let props = { ...options, data: {}, setData, loading: true }
  if (data) {
    props = { ...options, ...eventHandler, loading: false, data, setData, isNew }
  }
  return (
    <Presenter {...props} />
  )
}

export default Container
