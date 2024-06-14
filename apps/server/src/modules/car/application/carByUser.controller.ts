import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CarDomainFacade } from '@server/modules/car/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CarApplicationEvent } from './car.application.event'
import { CarCreateDto } from './car.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class CarByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private carDomainFacade: CarDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/owner/:ownerId/cars')
  async findManyOwnerId(
    @Param('ownerId') ownerId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(ownerId)

    const items = await this.carDomainFacade.findManyByOwner(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/owner/:ownerId/cars')
  async createByOwnerId(
    @Param('ownerId') ownerId: string,
    @Body() body: CarCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, ownerId }

    const item = await this.carDomainFacade.create(valuesUpdated)

    await this.eventService.emit<CarApplicationEvent.CarCreated.Payload>(
      CarApplicationEvent.CarCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
