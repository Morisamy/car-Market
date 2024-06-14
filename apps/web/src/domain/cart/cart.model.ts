import { User } from '../user'

import { CartItem } from '../cartItem'

export class Cart {
  id: string

  userId?: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  cartItems?: CartItem[]
}
