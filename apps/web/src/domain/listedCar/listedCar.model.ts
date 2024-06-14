import { User } from '../user'

import { Car } from '../car'

export class ListedCar {
  id: string

  userId?: string

  user?: User

  carId?: string

  car?: Car

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
