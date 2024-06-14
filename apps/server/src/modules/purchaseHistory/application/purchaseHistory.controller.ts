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
  PurchaseHistory,
  PurchaseHistoryDomainFacade,
} from '@server/modules/purchaseHistory/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { PurchaseHistoryApplicationEvent } from './purchaseHistory.application.event'
import {
  PurchaseHistoryCreateDto,
  PurchaseHistoryUpdateDto,
} from './purchaseHistory.dto'

@Controller('/v1/purchaseHistorys')
export class PurchaseHistoryController {
  constructor(
    private eventService: EventService,
    private purchaseHistoryDomainFacade: PurchaseHistoryDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.purchaseHistoryDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: PurchaseHistoryCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.purchaseHistoryDomainFacade.create(body)

    await this.eventService.emit<PurchaseHistoryApplicationEvent.PurchaseHistoryCreated.Payload>(
      PurchaseHistoryApplicationEvent.PurchaseHistoryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:purchaseHistoryId')
  async findOne(
    @Param('purchaseHistoryId') purchaseHistoryId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.purchaseHistoryDomainFacade.findOneByIdOrFail(
      purchaseHistoryId,
      queryOptions,
    )

    return item
  }

  @Patch('/:purchaseHistoryId')
  async update(
    @Param('purchaseHistoryId') purchaseHistoryId: string,
    @Body() body: PurchaseHistoryUpdateDto,
  ) {
    const item =
      await this.purchaseHistoryDomainFacade.findOneByIdOrFail(
        purchaseHistoryId,
      )

    const itemUpdated = await this.purchaseHistoryDomainFacade.update(
      item,
      body as Partial<PurchaseHistory>,
    )
    return itemUpdated
  }

  @Delete('/:purchaseHistoryId')
  async delete(@Param('purchaseHistoryId') purchaseHistoryId: string) {
    const item =
      await this.purchaseHistoryDomainFacade.findOneByIdOrFail(
        purchaseHistoryId,
      )

    await this.purchaseHistoryDomainFacade.delete(item)

    return item
  }
}
