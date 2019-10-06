import { BaseService } from './base_service'

export class DbService extends BaseService {
  constructor (tableName) {
    super()
    this.tableName = tableName
  }

  getItems (parameters) {
    let query = {
      from: this.tableName,
      ignoreCase: true,
      limit: parameters.limit,
      skip: parameters.skip,
      order: {
        by: parameters.sortBy,
        type: parameters.ascending ? 'asc' : 'desc'
      }
    }
    if (parameters.q) {
      query = { ...query, where: {...parameters.where, and: {
          deleted_at: null // Test
        }}
      }
    }
    return this.connection.select(query)
  }

  getCount (parameters) {
    let query = {
      from: this.tableName,
      ignoreCase: true
    }
    if (parameters.q) {
      query = { ...query, where: parameters.where }
    }
    return this.connection.count(query)
  }

  addItem (Item) {
    console.log(Item)
    return this.connection.insert({
      into: this.tableName,
      values: [Item],
      return: true
    })
  }

  getItemById (id) {
    return this.connection.select({
      from: this.tableName,
      where: {
        id: parseInt(id)
      }
    }).then(s => s ? s[0] : {})
  }

  removeItem (id) {
    const query = {
      from: this.tableName,
      where: {
        id: parseInt(id)
      }
    }
    return this.connection.remove(query)
  }

  updateItemById (id, updateData) {
    return this.connection.update({ in: this.tableName,
      set: updateData,
      where: {
        id: parseInt(id)
      }
    })
  }

  cancelQuery () {
    console.log(this.connection.terminate())
  }
}
