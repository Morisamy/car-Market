import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ListedSparePartDomainFacade } from '@server/modules/listedSparePart/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ListedSparePartApplicationEvent } from './listedSparePart.application.event'
import { ListedSparePartCreateDto } from './listedSparePart.dto'

import { SparePartDomainFacade } from '../../sparePart/domain'

@Controller('/v1/spareParts')
export class ListedSparePartBySparePartController {
  constructor(
    private sparePartDomainFacade: SparePartDomainFacade,

    private listedSparePartDomainFacade: ListedSparePartDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/sparePart/:sparePartId/listedSpareParts')
  async findManySparePartId(
    @Param('sparePartId') sparePartId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.sparePartDomainFacade.findOneByIdOrFail(sparePartId)

    const items = await this.listedSparePartDomainFacade.findManyBySparePart(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/sparePart/:sparePartId/listedSpareParts')
  async createBySparePartId(
    @Param('sparePartId') sparePartId: string,
    @Body() body: ListedSparePartCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, sparePartId }

    const item = await this.listedSparePartDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ListedSparePartApplicationEvent.ListedSparePartCreated.Payload>(
      ListedSparePartApplicationEvent.ListedSparePartCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
