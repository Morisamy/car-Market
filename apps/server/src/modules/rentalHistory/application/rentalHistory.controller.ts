import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  RentalHistory,
  RentalHistoryDomainFacade,
} from '@server/modules/rentalHistory/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { RentalHistoryApplicationEvent } from './rentalHistory.application.event'
import {
  RentalHistoryCreateDto,
  RentalHistoryUpdateDto,
} from './rentalHistory.dto'

@Controller('/v1/rentalHistorys')
export class RentalHistoryController {
  constructor(
    private eventService: EventService,
    private rentalHistoryDomainFacade: RentalHistoryDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.rentalHistoryDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: RentalHistoryCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.rentalHistoryDomainFacade.create(body)

    await this.eventService.emit<RentalHistoryApplicationEvent.RentalHistoryCreated.Payload>(
      RentalHistoryApplicationEvent.RentalHistoryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:rentalHistoryId')
  async findOne(
    @Param('rentalHistoryId') rentalHistoryId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.rentalHistoryDomainFacade.findOneByIdOrFail(
      rentalHistoryId,
      queryOptions,
    )

    return item
  }

  @Patch('/:rentalHistoryId')
  async update(
    @Param('rentalHistoryId') rentalHistoryId: string,
    @Body() body: RentalHistoryUpdateDto,
  ) {
    const item =
      await this.rentalHistoryDomainFacade.findOneByIdOrFail(rentalHistoryId)

    const itemUpdated = await this.rentalHistoryDomainFacade.update(
      item,
      body as Partial<RentalHistory>,
    )
    return itemUpdated
  }

  @Delete('/:rentalHistoryId')
  async delete(@Param('rentalHistoryId') rentalHistoryId: string) {
    const item =
      await this.rentalHistoryDomainFacade.findOneByIdOrFail(rentalHistoryId)

    await this.rentalHistoryDomainFacade.delete(item)

    return item
  }
}
