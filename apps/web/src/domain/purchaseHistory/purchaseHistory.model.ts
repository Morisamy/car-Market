import { User } from '../user'

import { SparePart } from '../sparePart'

export class PurchaseHistory {
  id: string

  purchaseDate: string

  userId?: string

  user?: User

  sparePartId?: string

  sparePart?: SparePart

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
