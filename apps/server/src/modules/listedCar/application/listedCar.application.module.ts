import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ListedCarDomainModule } from '../domain'
import { ListedCarController } from './listedCar.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ListedCarByUserController } from './listedCarByUser.controller'

import { CarDomainModule } from '../../../modules/car/domain'

import { ListedCarByCarController } from './listedCarByCar.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ListedCarDomainModule,

    UserDomainModule,

    CarDomainModule,
  ],
  controllers: [
    ListedCarController,

    ListedCarByUserController,

    ListedCarByCarController,
  ],
  providers: [],
})
export class ListedCarApplicationModule {}
