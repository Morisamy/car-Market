import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CartItemDomainFacade } from '@server/modules/cartItem/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CartItemApplicationEvent } from './cartItem.application.event'
import { CartItemCreateDto } from './cartItem.dto'

import { CarDomainFacade } from '../../car/domain'

@Controller('/v1/cars')
export class CartItemByCarController {
  constructor(
    private carDomainFacade: CarDomainFacade,

    private cartItemDomainFacade: CartItemDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/car/:carId/cartItems')
  async findManyCarId(@Param('carId') carId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.carDomainFacade.findOneByIdOrFail(carId)

    const items = await this.cartItemDomainFacade.findManyByCar(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/car/:carId/cartItems')
  async createByCarId(
    @Param('carId') carId: string,
    @Body() body: CartItemCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, carId }

    const item = await this.cartItemDomainFacade.create(valuesUpdated)

    await this.eventService.emit<CartItemApplicationEvent.CartItemCreated.Payload>(
      CartItemApplicationEvent.CartItemCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
