import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { CartItem } from './cartItem.model'

import { Cart } from '../../cart/domain'

import { Car } from '../../car/domain'

import { SparePart } from '../../sparePart/domain'

@Injectable()
export class CartItemDomainFacade {
  constructor(
    @InjectRepository(CartItem)
    private repository: Repository<CartItem>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<CartItem>): Promise<CartItem> {
    return this.repository.save(values)
  }

  async update(item: CartItem, values: Partial<CartItem>): Promise<CartItem> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: CartItem): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<CartItem> = {},
  ): Promise<CartItem[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<CartItem> = {},
  ): Promise<CartItem> {
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

  async findManyByCart(
    item: Cart,
    queryOptions: RequestHelper.QueryOptions<CartItem> = {},
  ): Promise<CartItem[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('cart')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        cartId: item.id,
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
    queryOptions: RequestHelper.QueryOptions<CartItem> = {},
  ): Promise<CartItem[]> {
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

  async findManyBySparePart(
    item: SparePart,
    queryOptions: RequestHelper.QueryOptions<CartItem> = {},
  ): Promise<CartItem[]> {
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
