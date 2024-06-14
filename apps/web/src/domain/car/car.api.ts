import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Car } from './car.model'

export class CarApi {
  static findMany(queryOptions?: ApiHelper.QueryOptions<Car>): Promise<Car[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/cars${buildOptions}`)
  }

  static findOne(
    carId: string,
    queryOptions?: ApiHelper.QueryOptions<Car>,
  ): Promise<Car> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/cars/${carId}${buildOptions}`)
  }

  static createOne(values: Partial<Car>): Promise<Car> {
    return HttpService.api.post(`/v1/cars`, values)
  }

  static updateOne(carId: string, values: Partial<Car>): Promise<Car> {
    return HttpService.api.patch(`/v1/cars/${carId}`, values)
  }

  static deleteOne(carId: string): Promise<void> {
    return HttpService.api.delete(`/v1/cars/${carId}`)
  }

  static findManyByOwnerId(
    ownerId: string,
    queryOptions?: ApiHelper.QueryOptions<Car>,
  ): Promise<Car[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/users/owner/${ownerId}/cars${buildOptions}`)
  }

  static createOneByOwnerId(
    ownerId: string,
    values: Partial<Car>,
  ): Promise<Car> {
    return HttpService.api.post(`/v1/users/owner/${ownerId}/cars`, values)
  }
}
