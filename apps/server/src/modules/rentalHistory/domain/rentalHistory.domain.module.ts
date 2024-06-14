import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { RentalHistoryDomainFacade } from './rentalHistory.domain.facade'
import { RentalHistory } from './rentalHistory.model'

@Module({
  imports: [TypeOrmModule.forFeature([RentalHistory]), DatabaseHelperModule],
  providers: [RentalHistoryDomainFacade, RentalHistoryDomainFacade],
  exports: [RentalHistoryDomainFacade],
})
export class RentalHistoryDomainModule {}
