import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { PurchaseHistoryDomainFacade } from './purchaseHistory.domain.facade'
import { PurchaseHistory } from './purchaseHistory.model'

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseHistory]), DatabaseHelperModule],
  providers: [PurchaseHistoryDomainFacade, PurchaseHistoryDomainFacade],
  exports: [PurchaseHistoryDomainFacade],
})
export class PurchaseHistoryDomainModule {}
