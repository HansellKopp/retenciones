/* eslint import/no-webpack-loader-syntax: off */
import * as JsStore from 'jsstore'
import { DATA_TYPE } from 'jsstore' // IDataBase, /, ITable

const getWorkerPath = () => {
  if (process.env.NODE_ENV === 'development') {
    return require('file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js')
  } else {
    return require('file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js')
  }
}

// This will ensure that we are using only one instance.
// Otherwise due to multiple instance multiple worker will be created.
const workerPath = getWorkerPath()
export const idbCon = new JsStore.Instance(new Worker(workerPath))
export const dbname = 'Retenciones'

const getDatabase = () => {
  const tblSuppliers = {
    name: 'Suppliers',
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      rif: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      address: {
        dataType: DATA_TYPE.String
      },
      phone: {
        dataType: DATA_TYPE.String
      }
    }
  }
  const dataBase = {
    name: dbname,
    tables: [tblSuppliers]
  }
  return dataBase
}

export const initJsStore = () => {
  try {
    const dataBase = getDatabase()
    idbCon.initDb(dataBase)
  } catch (ex) {
    console.error(ex)
  }
}
