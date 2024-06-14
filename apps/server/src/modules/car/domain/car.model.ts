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

import { RentalHistory } from '../../../modules/rentalHistory/domain'

import { ListedCar } from '../../../modules/listedCar/domain'

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  make: string

  @Column({})
  model: string

  @ColumnNumeric({ type: 'numeric' })
  year: number

  @ColumnNumeric({ type: 'numeric' })
  pricePerDay: number

  @Column({ nullable: true })
  ownerId?: string

  @ManyToOne(() => User, parent => parent.carsAsOwner)
  @JoinColumn({ name: 'ownerId' })
  owner?: User

  @OneToMany(() => CartItem, child => child.car)
  cartItems?: CartItem[]

  @OneToMany(() => RentalHistory, child => child.car)
  rentalHistorys?: RentalHistory[]

  @OneToMany(() => ListedCar, child => child.car)
  listedCars?: ListedCar[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
