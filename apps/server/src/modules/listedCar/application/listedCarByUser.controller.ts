import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ListedCarDomainFacade } from '@server/modules/listedCar/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ListedCarApplicationEvent } from './listedCar.application.event'
import { ListedCarCreateDto } from './listedCar.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class ListedCarByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private listedCarDomainFacade: ListedCarDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/listedCars')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.listedCarDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/listedCars')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: ListedCarCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.listedCarDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ListedCarApplicationEvent.ListedCarCreated.Payload>(
      ListedCarApplicationEvent.ListedCarCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
