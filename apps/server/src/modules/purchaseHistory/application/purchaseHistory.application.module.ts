import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { PurchaseHistoryDomainModule } from '../domain'
import { PurchaseHistoryController } from './purchaseHistory.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { PurchaseHistoryByUserController } from './purchaseHistoryByUser.controller'

import { SparePartDomainModule } from '../../../modules/sparePart/domain'

import { PurchaseHistoryBySparePartController } from './purchaseHistoryBySparePart.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    PurchaseHistoryDomainModule,

    UserDomainModule,

    SparePartDomainModule,
  ],
  controllers: [
    PurchaseHistoryController,

    PurchaseHistoryByUserController,

    PurchaseHistoryBySparePartController,
  ],
  providers: [],
})
export class PurchaseHistoryApplicationModule {}
