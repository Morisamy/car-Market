import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { SparePart } from './sparePart.model'

export class SparePartApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<SparePart>,
  ): Promise<SparePart[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/spareParts${buildOptions}`)
  }

  static findOne(
    sparePartId: string,
    queryOptions?: ApiHelper.QueryOptions<SparePart>,
  ): Promise<SparePart> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/spareParts/${sparePartId}${buildOptions}`)
  }

  static createOne(values: Partial<SparePart>): Promise<SparePart> {
    return HttpService.api.post(`/v1/spareParts`, values)
  }

  static updateOne(
    sparePartId: string,
    values: Partial<SparePart>,
  ): Promise<SparePart> {
    return HttpService.api.patch(`/v1/spareParts/${sparePartId}`, values)
  }

  static deleteOne(sparePartId: string): Promise<void> {
    return HttpService.api.delete(`/v1/spareParts/${sparePartId}`)
  }

  static findManyByOwnerId(
    ownerId: string,
    queryOptions?: ApiHelper.QueryOptions<SparePart>,
  ): Promise<SparePart[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/owner/${ownerId}/spareParts${buildOptions}`,
    )
  }

  static createOneByOwnerId(
    ownerId: string,
    values: Partial<SparePart>,
  ): Promise<SparePart> {
    return HttpService.api.post(`/v1/users/owner/${ownerId}/spareParts`, values)
  }
}
