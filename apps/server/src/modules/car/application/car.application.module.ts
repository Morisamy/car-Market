import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CarDomainModule } from '../domain'
import { CarController } from './car.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { CarByUserController } from './carByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, CarDomainModule, UserDomainModule],
  controllers: [CarController, CarByUserController],
  providers: [],
})
export class CarApplicationModule {}
