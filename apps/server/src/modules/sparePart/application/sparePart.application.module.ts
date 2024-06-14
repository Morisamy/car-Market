import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { SparePartDomainModule } from '../domain'
import { SparePartController } from './sparePart.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { SparePartByUserController } from './sparePartByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    SparePartDomainModule,

    UserDomainModule,
  ],
  controllers: [SparePartController, SparePartByUserController],
  providers: [],
})
export class SparePartApplicationModule {}
