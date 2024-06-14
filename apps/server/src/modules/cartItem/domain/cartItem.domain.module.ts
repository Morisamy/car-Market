import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CartItemDomainFacade } from './cartItem.domain.facade'
import { CartItem } from './cartItem.model'

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), DatabaseHelperModule],
  providers: [CartItemDomainFacade, CartItemDomainFacade],
  exports: [CartItemDomainFacade],
})
export class CartItemDomainModule {}
