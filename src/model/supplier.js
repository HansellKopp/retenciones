import { DbService } from '../service/dbService'
import items from './suppliers.js'

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
