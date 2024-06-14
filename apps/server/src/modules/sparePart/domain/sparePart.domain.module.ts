import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { SparePartDomainFacade } from './sparePart.domain.facade'
import { SparePart } from './sparePart.model'

@Module({
  imports: [TypeOrmModule.forFeature([SparePart]), DatabaseHelperModule],
  providers: [SparePartDomainFacade, SparePartDomainFacade],
  exports: [SparePartDomainFacade],
})
export class SparePartDomainModule {}
