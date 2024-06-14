import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { RentalHistoryDomainFacade } from '@server/modules/rentalHistory/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RentalHistoryApplicationEvent } from './rentalHistory.application.event'
import { RentalHistoryCreateDto } from './rentalHistory.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class RentalHistoryByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private rentalHistoryDomainFacade: RentalHistoryDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/rentalHistorys')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.rentalHistoryDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/rentalHistorys')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: RentalHistoryCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.rentalHistoryDomainFacade.create(valuesUpdated)

    await this.eventService.emit<RentalHistoryApplicationEvent.RentalHistoryCreated.Payload>(
      RentalHistoryApplicationEvent.RentalHistoryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
