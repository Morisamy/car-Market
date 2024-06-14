import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ListedCarDomainFacade } from './listedCar.domain.facade'
import { ListedCar } from './listedCar.model'

@Module({
  imports: [TypeOrmModule.forFeature([ListedCar]), DatabaseHelperModule],
  providers: [ListedCarDomainFacade, ListedCarDomainFacade],
  exports: [ListedCarDomainFacade],
})
export class ListedCarDomainModule {}
