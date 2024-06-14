import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CartDomainFacade } from './cart.domain.facade'
import { Cart } from './cart.model'

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), DatabaseHelperModule],
  providers: [CartDomainFacade, CartDomainFacade],
  exports: [CartDomainFacade],
})
export class CartDomainModule {}
