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
import { Car, CarDomainFacade } from '@server/modules/car/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CarApplicationEvent } from './car.application.event'
import { CarCreateDto, CarUpdateDto } from './car.dto'

@Controller('/v1/cars')
export class CarController {
  constructor(
    private eventService: EventService,
    private carDomainFacade: CarDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.carDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: CarCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.carDomainFacade.create(body)

    await this.eventService.emit<CarApplicationEvent.CarCreated.Payload>(
      CarApplicationEvent.CarCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:carId')
  async findOne(@Param('carId') carId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.carDomainFacade.findOneByIdOrFail(
      carId,
      queryOptions,
    )

    return item
  }

  @Patch('/:carId')
  async update(@Param('carId') carId: string, @Body() body: CarUpdateDto) {
    const item = await this.carDomainFacade.findOneByIdOrFail(carId)

    const itemUpdated = await this.carDomainFacade.update(
      item,
      body as Partial<Car>,
    )
    return itemUpdated
  }

  @Delete('/:carId')
  async delete(@Param('carId') carId: string) {
    const item = await this.carDomainFacade.findOneByIdOrFail(carId)

    await this.carDomainFacade.delete(item)

    return item
  }
}
