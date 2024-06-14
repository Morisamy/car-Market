import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { PurchaseHistory } from './purchaseHistory.model'

export class PurchaseHistoryApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<PurchaseHistory>,
  ): Promise<PurchaseHistory[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/purchaseHistorys${buildOptions}`)
  }

  static findOne(
    purchaseHistoryId: string,
    queryOptions?: ApiHelper.QueryOptions<PurchaseHistory>,
  ): Promise<PurchaseHistory> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/purchaseHistorys/${purchaseHistoryId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<PurchaseHistory>): Promise<PurchaseHistory> {
    return HttpService.api.post(`/v1/purchaseHistorys`, values)
  }

  static updateOne(
    purchaseHistoryId: string,
    values: Partial<PurchaseHistory>,
  ): Promise<PurchaseHistory> {
    return HttpService.api.patch(
      `/v1/purchaseHistorys/${purchaseHistoryId}`,
      values,
    )
  }

  static deleteOne(purchaseHistoryId: string): Promise<void> {
    return HttpService.api.delete(`/v1/purchaseHistorys/${purchaseHistoryId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<PurchaseHistory>,
  ): Promise<PurchaseHistory[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/purchaseHistorys${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<PurchaseHistory>,
  ): Promise<PurchaseHistory> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/purchaseHistorys`,
      values,
    )
  }

  static findManyBySparePartId(
    sparePartId: string,
    queryOptions?: ApiHelper.QueryOptions<PurchaseHistory>,
  ): Promise<PurchaseHistory[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/spareParts/sparePart/${sparePartId}/purchaseHistorys${buildOptions}`,
    )
  }

  static createOneBySparePartId(
    sparePartId: string,
    values: Partial<PurchaseHistory>,
  ): Promise<PurchaseHistory> {
    return HttpService.api.post(
      `/v1/spareParts/sparePart/${sparePartId}/purchaseHistorys`,
      values,
    )
  }
}
