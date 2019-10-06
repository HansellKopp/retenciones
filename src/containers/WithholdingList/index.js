import React, { useState, useEffect } from 'react'
import { hasPermission } from '../../utils'
import Presenter from './presenter'
import { DbService } from '../../service/dbService'
const service = new DbService('Withholdings')

const options = {
  table: 'Withholdings',
  url: '/withholdings',
  title: 'Retenciones',
  addNew: 'Crear retenciones',
  loading: false,
  fields: [
    {key: 'id', title: 'ID', class: 'table-only-desktop'},
    {key: 'period', title: 'Periodo', class: ''},
    {key: 'date', title: 'Fecha', class: '', format: 'date'},
    {key: 'number', title: 'Numero', class: ''},
    {key: 'rif', title: 'Cedula Rif', class: ''},
    {key: 'name', title: 'Razon Social', class: 'table-only-desktop', style: { maxWidth: 280 }},
  ],
  defaultData: { data: [], loading: true, total: 0 },
  defaultMeta: { current_page: 1, skip: 0, limit: 10, sortBy: 'number', ascending: true },
  canCreate: hasPermission('withholdings_create'),
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
            name: { like: `%${meta.q}%` },
            or: {
              number: { like: `%${meta.q}%` }
            }
          },
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
