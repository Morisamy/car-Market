import { User } from '../user'

import { CartItem } from '../cartItem'

import { RentalHistory } from '../rentalHistory'

import { ListedCar } from '../listedCar'

export class Car {
  id: string

  make: string

  model: string

  year: number

  pricePerDay: number

  ownerId?: string

  owner?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  cartItems?: CartItem[]

  rentalHistorys?: RentalHistory[]

  listedCars?: ListedCar[]
}
