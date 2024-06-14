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
  SparePart,
  SparePartDomainFacade,
} from '@server/modules/sparePart/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { SparePartApplicationEvent } from './sparePart.application.event'
import { SparePartCreateDto, SparePartUpdateDto } from './sparePart.dto'

@Controller('/v1/spareParts')
export class SparePartController {
  constructor(
    private eventService: EventService,
    private sparePartDomainFacade: SparePartDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.sparePartDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: SparePartCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.sparePartDomainFacade.create(body)

    await this.eventService.emit<SparePartApplicationEvent.SparePartCreated.Payload>(
      SparePartApplicationEvent.SparePartCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:sparePartId')
  async findOne(
    @Param('sparePartId') sparePartId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.sparePartDomainFacade.findOneByIdOrFail(
      sparePartId,
      queryOptions,
    )

    return item
  }

  @Patch('/:sparePartId')
  async update(
    @Param('sparePartId') sparePartId: string,
    @Body() body: SparePartUpdateDto,
  ) {
    const item = await this.sparePartDomainFacade.findOneByIdOrFail(sparePartId)

    const itemUpdated = await this.sparePartDomainFacade.update(
      item,
      body as Partial<SparePart>,
    )
    return itemUpdated
  }

  @Delete('/:sparePartId')
  async delete(@Param('sparePartId') sparePartId: string) {
    const item = await this.sparePartDomainFacade.findOneByIdOrFail(sparePartId)

    await this.sparePartDomainFacade.delete(item)

    return item
  }
}
