import { User } from '../user'

import { CartItem } from '../cartItem'

import { PurchaseHistory } from '../purchaseHistory'

import { ListedSparePart } from '../listedSparePart'

export class SparePart {
  id: string

  name: string

  description: string

  price: number

  ownerId?: string

  owner?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  cartItems?: CartItem[]

  purchaseHistorys?: PurchaseHistory[]

  listedSpareParts?: ListedSparePart[]
}
