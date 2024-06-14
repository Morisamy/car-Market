import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { RentalHistoryDomainModule } from '../domain'
import { RentalHistoryController } from './rentalHistory.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { RentalHistoryByUserController } from './rentalHistoryByUser.controller'

import { CarDomainModule } from '../../../modules/car/domain'

import { RentalHistoryByCarController } from './rentalHistoryByCar.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    RentalHistoryDomainModule,

    UserDomainModule,

    CarDomainModule,
  ],
  controllers: [
    RentalHistoryController,

    RentalHistoryByUserController,

    RentalHistoryByCarController,
  ],
  providers: [],
})
export class RentalHistoryApplicationModule {}
