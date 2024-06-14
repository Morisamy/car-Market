import { User } from '../user'

import { Car } from '../car'

export class RentalHistory {
  id: string

  rentalDate: string

  returnDate: string

  userId?: string

  user?: User

  carId?: string

  car?: Car

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
