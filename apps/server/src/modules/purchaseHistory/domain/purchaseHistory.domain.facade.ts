import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { PurchaseHistory } from './purchaseHistory.model'

import { User } from '../../user/domain'

import { SparePart } from '../../sparePart/domain'

@Injectable()
export class PurchaseHistoryDomainFacade {
  constructor(
    @InjectRepository(PurchaseHistory)
    private repository: Repository<PurchaseHistory>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<PurchaseHistory>): Promise<PurchaseHistory> {
    return this.repository.save(values)
  }

  async update(
    item: PurchaseHistory,
    values: Partial<PurchaseHistory>,
  ): Promise<PurchaseHistory> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: PurchaseHistory): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<PurchaseHistory> = {},
  ): Promise<PurchaseHistory[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<PurchaseHistory> = {},
  ): Promise<PurchaseHistory> {
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
    queryOptions: RequestHelper.QueryOptions<PurchaseHistory> = {},
  ): Promise<PurchaseHistory[]> {
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
    queryOptions: RequestHelper.QueryOptions<PurchaseHistory> = {},
  ): Promise<PurchaseHistory[]> {
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
