import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ListedSparePartDomainModule } from '../domain'
import { ListedSparePartController } from './listedSparePart.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ListedSparePartByUserController } from './listedSparePartByUser.controller'

import { SparePartDomainModule } from '../../../modules/sparePart/domain'

import { ListedSparePartBySparePartController } from './listedSparePartBySparePart.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ListedSparePartDomainModule,

    UserDomainModule,

    SparePartDomainModule,
  ],
  controllers: [
    ListedSparePartController,

    ListedSparePartByUserController,

    ListedSparePartBySparePartController,
  ],
  providers: [],
})
export class ListedSparePartApplicationModule {}
