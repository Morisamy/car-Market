import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { RentalHistory } from './rentalHistory.model'

export class RentalHistoryApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<RentalHistory>,
  ): Promise<RentalHistory[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/rentalHistorys${buildOptions}`)
  }

  static findOne(
    rentalHistoryId: string,
    queryOptions?: ApiHelper.QueryOptions<RentalHistory>,
  ): Promise<RentalHistory> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/rentalHistorys/${rentalHistoryId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<RentalHistory>): Promise<RentalHistory> {
    return HttpService.api.post(`/v1/rentalHistorys`, values)
  }

  static updateOne(
    rentalHistoryId: string,
    values: Partial<RentalHistory>,
  ): Promise<RentalHistory> {
    return HttpService.api.patch(
      `/v1/rentalHistorys/${rentalHistoryId}`,
      values,
    )
  }

  static deleteOne(rentalHistoryId: string): Promise<void> {
    return HttpService.api.delete(`/v1/rentalHistorys/${rentalHistoryId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<RentalHistory>,
  ): Promise<RentalHistory[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/rentalHistorys${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<RentalHistory>,
  ): Promise<RentalHistory> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/rentalHistorys`,
      values,
    )
  }

  static findManyByCarId(
    carId: string,
    queryOptions?: ApiHelper.QueryOptions<RentalHistory>,
  ): Promise<RentalHistory[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/cars/car/${carId}/rentalHistorys${buildOptions}`,
    )
  }

  static createOneByCarId(
    carId: string,
    values: Partial<RentalHistory>,
  ): Promise<RentalHistory> {
    return HttpService.api.post(`/v1/cars/car/${carId}/rentalHistorys`, values)
  }
}
