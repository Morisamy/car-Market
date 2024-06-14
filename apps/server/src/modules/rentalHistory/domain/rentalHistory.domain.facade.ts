import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { RentalHistory } from './rentalHistory.model'

import { User } from '../../user/domain'

import { Car } from '../../car/domain'

@Injectable()
export class RentalHistoryDomainFacade {
  constructor(
    @InjectRepository(RentalHistory)
    private repository: Repository<RentalHistory>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<RentalHistory>): Promise<RentalHistory> {
    return this.repository.save(values)
  }

  async update(
    item: RentalHistory,
    values: Partial<RentalHistory>,
  ): Promise<RentalHistory> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: RentalHistory): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<RentalHistory> = {},
  ): Promise<RentalHistory[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<RentalHistory> = {},
  ): Promise<RentalHistory> {
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
    queryOptions: RequestHelper.QueryOptions<RentalHistory> = {},
  ): Promise<RentalHistory[]> {
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

  async findManyByCar(
    item: Car,
    queryOptions: RequestHelper.QueryOptions<RentalHistory> = {},
  ): Promise<RentalHistory[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('car')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        carId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
