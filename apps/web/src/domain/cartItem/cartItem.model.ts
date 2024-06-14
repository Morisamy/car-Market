import { Cart } from '../cart'

import { Car } from '../car'

import { SparePart } from '../sparePart'

export class CartItem {
  id: string

  cartId?: string

  cart?: Cart

  carId?: string

  car?: Car

  sparePartId?: string

  sparePart?: SparePart

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
