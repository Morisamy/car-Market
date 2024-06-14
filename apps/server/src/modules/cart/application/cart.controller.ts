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
import { Cart, CartDomainFacade } from '@server/modules/cart/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CartApplicationEvent } from './cart.application.event'
import { CartCreateDto, CartUpdateDto } from './cart.dto'

@Controller('/v1/carts')
export class CartController {
  constructor(
    private eventService: EventService,
    private cartDomainFacade: CartDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.cartDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: CartCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.cartDomainFacade.create(body)

    await this.eventService.emit<CartApplicationEvent.CartCreated.Payload>(
      CartApplicationEvent.CartCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:cartId')
  async findOne(@Param('cartId') cartId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.cartDomainFacade.findOneByIdOrFail(
      cartId,
      queryOptions,
    )

    return item
  }

  @Patch('/:cartId')
  async update(@Param('cartId') cartId: string, @Body() body: CartUpdateDto) {
    const item = await this.cartDomainFacade.findOneByIdOrFail(cartId)

    const itemUpdated = await this.cartDomainFacade.update(
      item,
      body as Partial<Cart>,
    )
    return itemUpdated
  }

  @Delete('/:cartId')
  async delete(@Param('cartId') cartId: string) {
    const item = await this.cartDomainFacade.findOneByIdOrFail(cartId)

    await this.cartDomainFacade.delete(item)

    return item
  }
}
