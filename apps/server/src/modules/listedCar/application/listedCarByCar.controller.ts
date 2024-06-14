import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ListedCarDomainFacade } from '@server/modules/listedCar/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ListedCarApplicationEvent } from './listedCar.application.event'
import { ListedCarCreateDto } from './listedCar.dto'

import { CarDomainFacade } from '../../car/domain'

@Controller('/v1/cars')
export class ListedCarByCarController {
  constructor(
    private carDomainFacade: CarDomainFacade,

    private listedCarDomainFacade: ListedCarDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/car/:carId/listedCars')
  async findManyCarId(@Param('carId') carId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.carDomainFacade.findOneByIdOrFail(carId)

    const items = await this.listedCarDomainFacade.findManyByCar(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/car/:carId/listedCars')
  async createByCarId(
    @Param('carId') carId: string,
    @Body() body: ListedCarCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, carId }

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
