import { DATA_TYPE } from 'jsstore' // IDataBase, /, ITable

export const tblParameters = {
  name: 'Parameters',
  columns: {
    id: {
      primaryKey: true,
      autoIncrement: true
    },
    rif: {
      notNull: true,
      dataType: DATA_TYPE.String
    },
    name: {
      dataType: DATA_TYPE.String
    },
    period: {
      dataType: DATA_TYPE.number
    },
    tax_withheld: {
      dataType: DATA_TYPE.number
    },
    aliquot: {
      dataType: DATA_TYPE.number
    },
    vaucher: {
      dataType: DATA_TYPE.number
    }
  }
}
