import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { SparePartDomainFacade } from '@server/modules/sparePart/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { SparePartApplicationEvent } from './sparePart.application.event'
import { SparePartCreateDto } from './sparePart.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class SparePartByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private sparePartDomainFacade: SparePartDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/owner/:ownerId/spareParts')
  async findManyOwnerId(
    @Param('ownerId') ownerId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(ownerId)

    const items = await this.sparePartDomainFacade.findManyByOwner(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/owner/:ownerId/spareParts')
  async createByOwnerId(
    @Param('ownerId') ownerId: string,
    @Body() body: SparePartCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, ownerId }

    const item = await this.sparePartDomainFacade.create(valuesUpdated)

    await this.eventService.emit<SparePartApplicationEvent.SparePartCreated.Payload>(
      SparePartApplicationEvent.SparePartCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
