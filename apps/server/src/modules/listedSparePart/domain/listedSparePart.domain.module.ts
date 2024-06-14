import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ListedSparePartDomainFacade } from './listedSparePart.domain.facade'
import { ListedSparePart } from './listedSparePart.model'

@Module({
  imports: [TypeOrmModule.forFeature([ListedSparePart]), DatabaseHelperModule],
  providers: [ListedSparePartDomainFacade, ListedSparePartDomainFacade],
  exports: [ListedSparePartDomainFacade],
})
export class ListedSparePartDomainModule {}
