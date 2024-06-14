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
  ListedCar,
  ListedCarDomainFacade,
} from '@server/modules/listedCar/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ListedCarApplicationEvent } from './listedCar.application.event'
import { ListedCarCreateDto, ListedCarUpdateDto } from './listedCar.dto'

@Controller('/v1/listedCars')
export class ListedCarController {
  constructor(
    private eventService: EventService,
    private listedCarDomainFacade: ListedCarDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.listedCarDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ListedCarCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.listedCarDomainFacade.create(body)

    await this.eventService.emit<ListedCarApplicationEvent.ListedCarCreated.Payload>(
      ListedCarApplicationEvent.ListedCarCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:listedCarId')
  async findOne(
    @Param('listedCarId') listedCarId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.listedCarDomainFacade.findOneByIdOrFail(
      listedCarId,
      queryOptions,
    )

    return item
  }

  @Patch('/:listedCarId')
  async update(
    @Param('listedCarId') listedCarId: string,
    @Body() body: ListedCarUpdateDto,
  ) {
    const item = await this.listedCarDomainFacade.findOneByIdOrFail(listedCarId)

    const itemUpdated = await this.listedCarDomainFacade.update(
      item,
      body as Partial<ListedCar>,
    )
    return itemUpdated
  }

  @Delete('/:listedCarId')
  async delete(@Param('listedCarId') listedCarId: string) {
    const item = await this.listedCarDomainFacade.findOneByIdOrFail(listedCarId)

    await this.listedCarDomainFacade.delete(item)

    return item
  }
}
