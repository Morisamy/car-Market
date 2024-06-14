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
import { CartItem, CartItemDomainFacade } from '@server/modules/cartItem/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CartItemApplicationEvent } from './cartItem.application.event'
import { CartItemCreateDto, CartItemUpdateDto } from './cartItem.dto'

@Controller('/v1/cartItems')
export class CartItemController {
  constructor(
    private eventService: EventService,
    private cartItemDomainFacade: CartItemDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.cartItemDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: CartItemCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.cartItemDomainFacade.create(body)

    await this.eventService.emit<CartItemApplicationEvent.CartItemCreated.Payload>(
      CartItemApplicationEvent.CartItemCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:cartItemId')
  async findOne(
    @Param('cartItemId') cartItemId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.cartItemDomainFacade.findOneByIdOrFail(
      cartItemId,
      queryOptions,
    )

    return item
  }

  @Patch('/:cartItemId')
  async update(
    @Param('cartItemId') cartItemId: string,
    @Body() body: CartItemUpdateDto,
  ) {
    const item = await this.cartItemDomainFacade.findOneByIdOrFail(cartItemId)

    const itemUpdated = await this.cartItemDomainFacade.update(
      item,
      body as Partial<CartItem>,
    )
    return itemUpdated
  }

  @Delete('/:cartItemId')
  async delete(@Param('cartItemId') cartItemId: string) {
    const item = await this.cartItemDomainFacade.findOneByIdOrFail(cartItemId)

    await this.cartItemDomainFacade.delete(item)

    return item
  }
}
