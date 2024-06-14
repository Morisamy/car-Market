import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { RentalHistoryDomainFacade } from '@server/modules/rentalHistory/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RentalHistoryApplicationEvent } from './rentalHistory.application.event'
import { RentalHistoryCreateDto } from './rentalHistory.dto'

import { CarDomainFacade } from '../../car/domain'

@Controller('/v1/cars')
export class RentalHistoryByCarController {
  constructor(
    private carDomainFacade: CarDomainFacade,

    private rentalHistoryDomainFacade: RentalHistoryDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/car/:carId/rentalHistorys')
  async findManyCarId(@Param('carId') carId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.carDomainFacade.findOneByIdOrFail(carId)

    const items = await this.rentalHistoryDomainFacade.findManyByCar(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/car/:carId/rentalHistorys')
  async createByCarId(
    @Param('carId') carId: string,
    @Body() body: RentalHistoryCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, carId }

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
