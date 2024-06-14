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

import { Notification } from '../../../modules/notification/domain'

import { Car } from '../../../modules/car/domain'

import { SparePart } from '../../../modules/sparePart/domain'

import { Cart } from '../../../modules/cart/domain'

import { RentalHistory } from '../../../modules/rentalHistory/domain'

import { PurchaseHistory } from '../../../modules/purchaseHistory/domain'

import { ListedCar } from '../../../modules/listedCar/domain'

import { ListedSparePart } from '../../../modules/listedSparePart/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true, unique: true })
  email?: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ nullable: true, select: false })
  stripeCustomerId?: string

  @Column({ nullable: true, select: false })
  password?: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => Car, child => child.owner)
  carsAsOwner?: Car[]

  @OneToMany(() => SparePart, child => child.owner)
  sparePartsAsOwner?: SparePart[]

  @OneToMany(() => Cart, child => child.user)
  carts?: Cart[]

  @OneToMany(() => RentalHistory, child => child.user)
  rentalHistorys?: RentalHistory[]

  @OneToMany(() => PurchaseHistory, child => child.user)
  purchaseHistorys?: PurchaseHistory[]

  @OneToMany(() => ListedCar, child => child.user)
  listedCars?: ListedCar[]

  @OneToMany(() => ListedSparePart, child => child.user)
  listedSpareParts?: ListedSparePart[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
