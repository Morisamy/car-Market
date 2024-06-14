import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CartDomainModule } from '../domain'
import { CartController } from './cart.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { CartByUserController } from './cartByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, CartDomainModule, UserDomainModule],
  controllers: [CartController, CartByUserController],
  providers: [],
})
export class CartApplicationModule {}
