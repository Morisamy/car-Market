import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { ListedSparePart } from './listedSparePart.model'

export class ListedSparePartApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<ListedSparePart>,
  ): Promise<ListedSparePart[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/listedSpareParts${buildOptions}`)
  }

  static findOne(
    listedSparePartId: string,
    queryOptions?: ApiHelper.QueryOptions<ListedSparePart>,
  ): Promise<ListedSparePart> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/listedSpareParts/${listedSparePartId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<ListedSparePart>): Promise<ListedSparePart> {
    return HttpService.api.post(`/v1/listedSpareParts`, values)
  }

  static updateOne(
    listedSparePartId: string,
    values: Partial<ListedSparePart>,
  ): Promise<ListedSparePart> {
    return HttpService.api.patch(
      `/v1/listedSpareParts/${listedSparePartId}`,
      values,
    )
  }

  static deleteOne(listedSparePartId: string): Promise<void> {
    return HttpService.api.delete(`/v1/listedSpareParts/${listedSparePartId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<ListedSparePart>,
  ): Promise<ListedSparePart[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/listedSpareParts${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<ListedSparePart>,
  ): Promise<ListedSparePart> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/listedSpareParts`,
      values,
    )
  }

  static findManyBySparePartId(
    sparePartId: string,
    queryOptions?: ApiHelper.QueryOptions<ListedSparePart>,
  ): Promise<ListedSparePart[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/spareParts/sparePart/${sparePartId}/listedSpareParts${buildOptions}`,
    )
  }

  static createOneBySparePartId(
    sparePartId: string,
    values: Partial<ListedSparePart>,
  ): Promise<ListedSparePart> {
    return HttpService.api.post(
      `/v1/spareParts/sparePart/${sparePartId}/listedSpareParts`,
      values,
    )
  }
}
