import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { SparePart } from './sparePart.model'

import { User } from '../../user/domain'

@Injectable()
export class SparePartDomainFacade {
  constructor(
    @InjectRepository(SparePart)
    private repository: Repository<SparePart>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<SparePart>): Promise<SparePart> {
    return this.repository.save(values)
  }

  async update(
    item: SparePart,
    values: Partial<SparePart>,
  ): Promise<SparePart> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: SparePart): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<SparePart> = {},
  ): Promise<SparePart[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<SparePart> = {},
  ): Promise<SparePart> {
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

  async findManyByOwner(
    item: User,
    queryOptions: RequestHelper.QueryOptions<SparePart> = {},
  ): Promise<SparePart[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('owner')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        ownerId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
