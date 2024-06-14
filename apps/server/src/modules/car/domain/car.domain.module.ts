import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CarDomainFacade } from './car.domain.facade'
import { Car } from './car.model'

@Module({
  imports: [TypeOrmModule.forFeature([Car]), DatabaseHelperModule],
  providers: [CarDomainFacade, CarDomainFacade],
  exports: [CarDomainFacade],
})
export class CarDomainModule {}
