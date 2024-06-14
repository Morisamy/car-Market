import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { CarApplicationModule } from './car/application'

import { SparePartApplicationModule } from './sparePart/application'

import { CartApplicationModule } from './cart/application'

import { CartItemApplicationModule } from './cartItem/application'

import { RentalHistoryApplicationModule } from './rentalHistory/application'

import { PurchaseHistoryApplicationModule } from './purchaseHistory/application'

import { ListedCarApplicationModule } from './listedCar/application'

import { ListedSparePartApplicationModule } from './listedSparePart/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { BillingApplicationModule } from './billing/application'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,
    BillingApplicationModule,

    CarApplicationModule,

    SparePartApplicationModule,

    CartApplicationModule,

    CartItemApplicationModule,

    RentalHistoryApplicationModule,

    PurchaseHistoryApplicationModule,

    ListedCarApplicationModule,

    ListedSparePartApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
