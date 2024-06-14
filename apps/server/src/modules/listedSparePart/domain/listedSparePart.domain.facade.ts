import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { ListedSparePart } from './listedSparePart.model'

import { User } from '../../user/domain'

import { SparePart } from '../../sparePart/domain'

@Injectable()
export class ListedSparePartDomainFacade {
  constructor(
    @InjectRepository(ListedSparePart)
    private repository: Repository<ListedSparePart>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<ListedSparePart>): Promise<ListedSparePart> {
    return this.repository.save(values)
  }

  async update(
    item: ListedSparePart,
    values: Partial<ListedSparePart>,
  ): Promise<ListedSparePart> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: ListedSparePart): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<ListedSparePart> = {},
  ): Promise<ListedSparePart[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<ListedSparePart> = {},
  ): Promise<ListedSparePart> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<ListedSparePart> = {},
  ): Promise<ListedSparePart[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyBySparePart(
    item: SparePart,
    queryOptions: RequestHelper.QueryOptions<ListedSparePart> = {},
  ): Promise<ListedSparePart[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('sparePart')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        sparePartId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
