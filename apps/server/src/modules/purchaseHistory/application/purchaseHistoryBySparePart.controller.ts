import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PurchaseHistoryDomainFacade } from '@server/modules/purchaseHistory/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PurchaseHistoryApplicationEvent } from './purchaseHistory.application.event'
import { PurchaseHistoryCreateDto } from './purchaseHistory.dto'

import { SparePartDomainFacade } from '../../sparePart/domain'

@Controller('/v1/spareParts')
export class PurchaseHistoryBySparePartController {
  constructor(
    private sparePartDomainFacade: SparePartDomainFacade,

    private purchaseHistoryDomainFacade: PurchaseHistoryDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/sparePart/:sparePartId/purchaseHistorys')
  async findManySparePartId(
    @Param('sparePartId') sparePartId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.sparePartDomainFacade.findOneByIdOrFail(sparePartId)

    const items = await this.purchaseHistoryDomainFacade.findManyBySparePart(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/sparePart/:sparePartId/purchaseHistorys')
  async createBySparePartId(
    @Param('sparePartId') sparePartId: string,
    @Body() body: PurchaseHistoryCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, sparePartId }

    const item = await this.purchaseHistoryDomainFacade.create(valuesUpdated)

    await this.eventService.emit<PurchaseHistoryApplicationEvent.PurchaseHistoryCreated.Payload>(
      PurchaseHistoryApplicationEvent.PurchaseHistoryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
