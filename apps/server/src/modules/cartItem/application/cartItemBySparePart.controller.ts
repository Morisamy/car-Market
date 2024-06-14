import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CartItemDomainFacade } from '@server/modules/cartItem/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CartItemApplicationEvent } from './cartItem.application.event'
import { CartItemCreateDto } from './cartItem.dto'

import { SparePartDomainFacade } from '../../sparePart/domain'

@Controller('/v1/spareParts')
export class CartItemBySparePartController {
  constructor(
    private sparePartDomainFacade: SparePartDomainFacade,

    private cartItemDomainFacade: CartItemDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/sparePart/:sparePartId/cartItems')
  async findManySparePartId(
    @Param('sparePartId') sparePartId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.sparePartDomainFacade.findOneByIdOrFail(sparePartId)

    const items = await this.cartItemDomainFacade.findManyBySparePart(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/sparePart/:sparePartId/cartItems')
  async createBySparePartId(
    @Param('sparePartId') sparePartId: string,
    @Body() body: CartItemCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, sparePartId }

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
