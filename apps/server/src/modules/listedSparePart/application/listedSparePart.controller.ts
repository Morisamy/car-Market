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
  ListedSparePart,
  ListedSparePartDomainFacade,
} from '@server/modules/listedSparePart/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ListedSparePartApplicationEvent } from './listedSparePart.application.event'
import {
  ListedSparePartCreateDto,
  ListedSparePartUpdateDto,
} from './listedSparePart.dto'

@Controller('/v1/listedSpareParts')
export class ListedSparePartController {
  constructor(
    private eventService: EventService,
    private listedSparePartDomainFacade: ListedSparePartDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.listedSparePartDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: ListedSparePartCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.listedSparePartDomainFacade.create(body)

    await this.eventService.emit<ListedSparePartApplicationEvent.ListedSparePartCreated.Payload>(
      ListedSparePartApplicationEvent.ListedSparePartCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:listedSparePartId')
  async findOne(
    @Param('listedSparePartId') listedSparePartId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.listedSparePartDomainFacade.findOneByIdOrFail(
      listedSparePartId,
      queryOptions,
    )

    return item
  }

  @Patch('/:listedSparePartId')
  async update(
    @Param('listedSparePartId') listedSparePartId: string,
    @Body() body: ListedSparePartUpdateDto,
  ) {
    const item =
      await this.listedSparePartDomainFacade.findOneByIdOrFail(
        listedSparePartId,
      )

    const itemUpdated = await this.listedSparePartDomainFacade.update(
      item,
      body as Partial<ListedSparePart>,
    )
    return itemUpdated
  }

  @Delete('/:listedSparePartId')
  async delete(@Param('listedSparePartId') listedSparePartId: string) {
    const item =
      await this.listedSparePartDomainFacade.findOneByIdOrFail(
        listedSparePartId,
      )

    await this.listedSparePartDomainFacade.delete(item)

    return item
  }
}
