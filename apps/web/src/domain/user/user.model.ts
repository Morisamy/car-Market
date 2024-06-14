import { Notification } from '../notification'

import { Car } from '../car'

import { SparePart } from '../sparePart'

import { Cart } from '../cart'

import { RentalHistory } from '../rentalHistory'

import { PurchaseHistory } from '../purchaseHistory'

import { ListedCar } from '../listedCar'

import { ListedSparePart } from '../listedSparePart'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email?: string
  status: UserStatus
  name?: string
  pictureUrl?: string
  password?: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  carsAsOwner?: Car[]

  sparePartsAsOwner?: SparePart[]

  carts?: Cart[]

  rentalHistorys?: RentalHistory[]

  purchaseHistorys?: PurchaseHistory[]

  listedCars?: ListedCar[]

  listedSpareParts?: ListedSparePart[]
}
