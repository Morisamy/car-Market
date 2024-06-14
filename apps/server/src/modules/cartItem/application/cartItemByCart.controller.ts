import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CartItemDomainFacade } from '@server/modules/cartItem/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CartItemApplicationEvent } from './cartItem.application.event'
import { CartItemCreateDto } from './cartItem.dto'

import { CartDomainFacade } from '../../cart/domain'

@Controller('/v1/carts')
export class CartItemByCartController {
  constructor(
    private cartDomainFacade: CartDomainFacade,

    private cartItemDomainFacade: CartItemDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/cart/:cartId/cartItems')
  async findManyCartId(
    @Param('cartId') cartId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.cartDomainFacade.findOneByIdOrFail(cartId)

    const items = await this.cartItemDomainFacade.findManyByCart(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/cart/:cartId/cartItems')
  async createByCartId(
    @Param('cartId') cartId: string,
    @Body() body: CartItemCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, cartId }

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
