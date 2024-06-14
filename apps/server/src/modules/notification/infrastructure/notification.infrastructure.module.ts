import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationCarSubscriber } from './subscribers/notification.car.subscriber'

import { NotificationSparePartSubscriber } from './subscribers/notification.sparePart.subscriber'

import { NotificationCartSubscriber } from './subscribers/notification.cart.subscriber'

import { NotificationCartItemSubscriber } from './subscribers/notification.cartItem.subscriber'

import { NotificationRentalHistorySubscriber } from './subscribers/notification.rentalHistory.subscriber'

import { NotificationPurchaseHistorySubscriber } from './subscribers/notification.purchaseHistory.subscriber'

import { NotificationListedCarSubscriber } from './subscribers/notification.listedCar.subscriber'

import { NotificationListedSparePartSubscriber } from './subscribers/notification.listedSparePart.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationCarSubscriber,

    NotificationSparePartSubscriber,

    NotificationCartSubscriber,

    NotificationCartItemSubscriber,

    NotificationRentalHistorySubscriber,

    NotificationPurchaseHistorySubscriber,

    NotificationListedCarSubscriber,

    NotificationListedSparePartSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
