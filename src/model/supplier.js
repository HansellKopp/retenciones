import { DbService } from '../service/dbService'
import { DATA_TYPE } from 'jsstore' // IDataBase, /, ITable

import items from './suppliers.js'

export const tblSuppliers = {
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
    },
    created_at: {
      dataType: DATA_TYPE.DateTime
    },
    updated_at: {
      dataType: DATA_TYPE.DateTime
    },
    deleted_at: {
      dataType: DATA_TYPE.DateTime
    }
  }
}

export function seedSupplier () {
  const service = new DbService('Suppliers')
  items.forEach((element) => {
    service.addItem({
      name: element.name,
      rif: element.rif,
      address: element.address === 'null' ? '' : element.address,
      phone: element.phone === 'null' ? '' : element.phone
    })
  })
}
