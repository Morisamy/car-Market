import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { CarDomainModule } from './car/domain'

import { SparePartDomainModule } from './sparePart/domain'

import { CartDomainModule } from './cart/domain'

import { CartItemDomainModule } from './cartItem/domain'

import { RentalHistoryDomainModule } from './rentalHistory/domain'

import { PurchaseHistoryDomainModule } from './purchaseHistory/domain'

import { ListedCarDomainModule } from './listedCar/domain'

import { ListedSparePartDomainModule } from './listedSparePart/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    CarDomainModule,

    SparePartDomainModule,

    CartDomainModule,

    CartItemDomainModule,

    RentalHistoryDomainModule,

    PurchaseHistoryDomainModule,

    ListedCarDomainModule,

    ListedSparePartDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
