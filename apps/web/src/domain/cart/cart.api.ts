import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Cart } from './cart.model'

export class CartApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Cart>,
  ): Promise<Cart[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/carts${buildOptions}`)
  }

  static findOne(
    cartId: string,
    queryOptions?: ApiHelper.QueryOptions<Cart>,
  ): Promise<Cart> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/carts/${cartId}${buildOptions}`)
  }

  static createOne(values: Partial<Cart>): Promise<Cart> {
    return HttpService.api.post(`/v1/carts`, values)
  }

  static updateOne(cartId: string, values: Partial<Cart>): Promise<Cart> {
    return HttpService.api.patch(`/v1/carts/${cartId}`, values)
  }

  static deleteOne(cartId: string): Promise<void> {
    return HttpService.api.delete(`/v1/carts/${cartId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Cart>,
  ): Promise<Cart[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/users/user/${userId}/carts${buildOptions}`)
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Cart>,
  ): Promise<Cart> {
    return HttpService.api.post(`/v1/users/user/${userId}/carts`, values)
  }
}
