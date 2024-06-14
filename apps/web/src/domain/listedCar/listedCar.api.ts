import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { ListedCar } from './listedCar.model'

export class ListedCarApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<ListedCar>,
  ): Promise<ListedCar[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/listedCars${buildOptions}`)
  }

  static findOne(
    listedCarId: string,
    queryOptions?: ApiHelper.QueryOptions<ListedCar>,
  ): Promise<ListedCar> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/listedCars/${listedCarId}${buildOptions}`)
  }

  static createOne(values: Partial<ListedCar>): Promise<ListedCar> {
    return HttpService.api.post(`/v1/listedCars`, values)
  }

  static updateOne(
    listedCarId: string,
    values: Partial<ListedCar>,
  ): Promise<ListedCar> {
    return HttpService.api.patch(`/v1/listedCars/${listedCarId}`, values)
  }

  static deleteOne(listedCarId: string): Promise<void> {
    return HttpService.api.delete(`/v1/listedCars/${listedCarId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<ListedCar>,
  ): Promise<ListedCar[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/listedCars${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<ListedCar>,
  ): Promise<ListedCar> {
    return HttpService.api.post(`/v1/users/user/${userId}/listedCars`, values)
  }

  static findManyByCarId(
    carId: string,
    queryOptions?: ApiHelper.QueryOptions<ListedCar>,
  ): Promise<ListedCar[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/cars/car/${carId}/listedCars${buildOptions}`,
    )
  }

  static createOneByCarId(
    carId: string,
    values: Partial<ListedCar>,
  ): Promise<ListedCar> {
    return HttpService.api.post(`/v1/cars/car/${carId}/listedCars`, values)
  }
}
