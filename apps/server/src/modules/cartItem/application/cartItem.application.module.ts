import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CartItemDomainModule } from '../domain'
import { CartItemController } from './cartItem.controller'

import { CartDomainModule } from '../../../modules/cart/domain'

import { CartItemByCartController } from './cartItemByCart.controller'

import { CarDomainModule } from '../../../modules/car/domain'

import { CartItemByCarController } from './cartItemByCar.controller'

import { SparePartDomainModule } from '../../../modules/sparePart/domain'

import { CartItemBySparePartController } from './cartItemBySparePart.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    CartItemDomainModule,

    CartDomainModule,

    CarDomainModule,

    SparePartDomainModule,
  ],
  controllers: [
    CartItemController,

    CartItemByCartController,

    CartItemByCarController,

    CartItemBySparePartController,
  ],
  providers: [],
})
export class CartItemApplicationModule {}
