import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Cart } from '../../../modules/cart/domain'

import { Car } from '../../../modules/car/domain'

import { SparePart } from '../../../modules/sparePart/domain'

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  cartId?: string

  @ManyToOne(() => Cart, parent => parent.cartItems)
  @JoinColumn({ name: 'cartId' })
  cart?: Cart

  @Column({ nullable: true })
  carId?: string

  @ManyToOne(() => Car, parent => parent.cartItems)
  @JoinColumn({ name: 'carId' })
  car?: Car

  @Column({ nullable: true })
  sparePartId?: string

  @ManyToOne(() => SparePart, parent => parent.cartItems)
  @JoinColumn({ name: 'sparePartId' })
  sparePart?: SparePart

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
