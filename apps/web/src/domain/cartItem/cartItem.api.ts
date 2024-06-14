import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { CartItem } from './cartItem.model'

export class CartItemApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<CartItem>,
  ): Promise<CartItem[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/cartItems${buildOptions}`)
  }

  static findOne(
    cartItemId: string,
    queryOptions?: ApiHelper.QueryOptions<CartItem>,
  ): Promise<CartItem> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/cartItems/${cartItemId}${buildOptions}`)
  }

  static createOne(values: Partial<CartItem>): Promise<CartItem> {
    return HttpService.api.post(`/v1/cartItems`, values)
  }

  static updateOne(
    cartItemId: string,
    values: Partial<CartItem>,
  ): Promise<CartItem> {
    return HttpService.api.patch(`/v1/cartItems/${cartItemId}`, values)
  }

  static deleteOne(cartItemId: string): Promise<void> {
    return HttpService.api.delete(`/v1/cartItems/${cartItemId}`)
  }

  static findManyByCartId(
    cartId: string,
    queryOptions?: ApiHelper.QueryOptions<CartItem>,
  ): Promise<CartItem[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/carts/cart/${cartId}/cartItems${buildOptions}`,
    )
  }

  static createOneByCartId(
    cartId: string,
    values: Partial<CartItem>,
  ): Promise<CartItem> {
    return HttpService.api.post(`/v1/carts/cart/${cartId}/cartItems`, values)
  }

  static findManyByCarId(
    carId: string,
    queryOptions?: ApiHelper.QueryOptions<CartItem>,
  ): Promise<CartItem[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/cars/car/${carId}/cartItems${buildOptions}`)
  }

  static createOneByCarId(
    carId: string,
    values: Partial<CartItem>,
  ): Promise<CartItem> {
    return HttpService.api.post(`/v1/cars/car/${carId}/cartItems`, values)
  }

  static findManyBySparePartId(
    sparePartId: string,
    queryOptions?: ApiHelper.QueryOptions<CartItem>,
  ): Promise<CartItem[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/spareParts/sparePart/${sparePartId}/cartItems${buildOptions}`,
    )
  }

  static createOneBySparePartId(
    sparePartId: string,
    values: Partial<CartItem>,
  ): Promise<CartItem> {
    return HttpService.api.post(
      `/v1/spareParts/sparePart/${sparePartId}/cartItems`,
      values,
    )
  }
}
