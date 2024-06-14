import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { ListedCar } from './listedCar.model'

import { User } from '../../user/domain'

import { Car } from '../../car/domain'

@Injectable()
export class ListedCarDomainFacade {
  constructor(
    @InjectRepository(ListedCar)
    private repository: Repository<ListedCar>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<ListedCar>): Promise<ListedCar> {
    return this.repository.save(values)
  }

  async update(
    item: ListedCar,
    values: Partial<ListedCar>,
  ): Promise<ListedCar> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: ListedCar): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<ListedCar> = {},
  ): Promise<ListedCar[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<ListedCar> = {},
  ): Promise<ListedCar> {
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
    queryOptions: RequestHelper.QueryOptions<ListedCar> = {},
  ): Promise<ListedCar[]> {
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
    queryOptions: RequestHelper.QueryOptions<ListedCar> = {},
  ): Promise<ListedCar[]> {
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
