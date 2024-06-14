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

import { User } from '../../../modules/user/domain'

import { CartItem } from '../../../modules/cartItem/domain'

import { PurchaseHistory } from '../../../modules/purchaseHistory/domain'

import { ListedSparePart } from '../../../modules/listedSparePart/domain'

@Entity()
export class SparePart {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({})
  description: string

  @ColumnNumeric({ type: 'numeric' })
  price: number

  @Column({ nullable: true })
  ownerId?: string

  @ManyToOne(() => User, parent => parent.sparePartsAsOwner)
  @JoinColumn({ name: 'ownerId' })
  owner?: User

  @OneToMany(() => CartItem, child => child.sparePart)
  cartItems?: CartItem[]

  @OneToMany(() => PurchaseHistory, child => child.sparePart)
  purchaseHistorys?: PurchaseHistory[]

  @OneToMany(() => ListedSparePart, child => child.sparePart)
  listedSpareParts?: ListedSparePart[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
