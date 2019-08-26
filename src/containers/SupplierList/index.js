import React, { useState, useEffect } from 'react'
import { hasPermission } from '../../utils'
import Presenter from './presenter'
import { DbService } from '../../service/dbService'
const service = new DbService('Suppliers')

const options = {
  table: 'Suppliers',
  url: '/suppliers',
  title: 'Proveedores',
  addNew: 'Crear proveedor',
  loading: false,
  fields: [
    {key: 'id', title: 'ID', class: 'table-only-desktop'},
    {key: 'name', title: 'Razon Social', class: '', style: { maxWidth: 280 }},
    {key: 'rif', title: 'Cedula Rif', class: 'table-only-desktop'},
    // {key: 'address', title: 'Direccion', class: 'table-only-desktop'},
    {key: 'phone', title: 'Telefono', class: 'table-only-desktop'}
  ],
  defaultData: { data: [], loading: true, total: 0 },
  defaultMeta: { current_page: 1, skip: 0, limit: 10, sortBy: 'name', ascending: true },
  canCreate: hasPermission('supplier_create'),
  handleDismiss: (e) => { console.log(e) }
}

function Container () {
  const [data, setData] = useState(options.defaultData)
  const [meta, setMeta] = useState(options.defaultMeta)

  useEffect(() => {
    async function fetchData () {
      try {
        meta.where = {
          rif: { like: `%${meta.q}%` },
          or: {
            name: { like: `%${meta.q}%` }
          }
        }
        let items = await service.getItems(meta)
        let total = await service.getCount(meta)
        setData({ data: items, loading: false, total: total })
      } catch (ex) {
        console.error(ex)
      }
    }
    fetchData()
  }, [meta])

  let props = { ...options, ...data, meta: { ...options.defaultMeta } }
  if (data && meta) {
    props = { ...options, ...data, meta: { ...meta }, setMeta, setData }
  }

  return (
    <Presenter {...props} setData setmeta />
  )
}

export default Container
