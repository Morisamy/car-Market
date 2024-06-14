import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { BillingApi } from './billing/billing.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { CarApi } from './car/car.api'

import { SparePartApi } from './sparePart/sparePart.api'

import { CartApi } from './cart/cart.api'

import { CartItemApi } from './cartItem/cartItem.api'

import { RentalHistoryApi } from './rentalHistory/rentalHistory.api'

import { PurchaseHistoryApi } from './purchaseHistory/purchaseHistory.api'

import { ListedCarApi } from './listedCar/listedCar.api'

import { ListedSparePartApi } from './listedSparePart/listedSparePart.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Billing extends BillingApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Car extends CarApi {}

  export class SparePart extends SparePartApi {}

  export class Cart extends CartApi {}

  export class CartItem extends CartItemApi {}

  export class RentalHistory extends RentalHistoryApi {}

  export class PurchaseHistory extends PurchaseHistoryApi {}

  export class ListedCar extends ListedCarApi {}

  export class ListedSparePart extends ListedSparePartApi {}
}
