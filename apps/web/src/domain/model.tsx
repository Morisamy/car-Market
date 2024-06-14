import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'
import {
  BillingPayment as BillingPaymentModel,
  BillingProduct as BillingProductModel,
  BillingSubscription as BillingSubscriptionModel,
} from './billing/billing.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Car as CarModel } from './car/car.model'

import { SparePart as SparePartModel } from './sparePart/sparePart.model'

import { Cart as CartModel } from './cart/cart.model'

import { CartItem as CartItemModel } from './cartItem/cartItem.model'

import { RentalHistory as RentalHistoryModel } from './rentalHistory/rentalHistory.model'

import { PurchaseHistory as PurchaseHistoryModel } from './purchaseHistory/purchaseHistory.model'

import { ListedCar as ListedCarModel } from './listedCar/listedCar.model'

import { ListedSparePart as ListedSparePartModel } from './listedSparePart/listedSparePart.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}
  export class BillingProduct extends BillingProductModel {}
  export class BillingPayment extends BillingPaymentModel {}
  export class BillingSubscription extends BillingSubscriptionModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Car extends CarModel {}

  export class SparePart extends SparePartModel {}

  export class Cart extends CartModel {}

  export class CartItem extends CartItemModel {}

  export class RentalHistory extends RentalHistoryModel {}

  export class PurchaseHistory extends PurchaseHistoryModel {}

  export class ListedCar extends ListedCarModel {}

  export class ListedSparePart extends ListedSparePartModel {}
}
