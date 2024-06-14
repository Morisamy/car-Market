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

import { Car } from '../../../modules/car/domain'

@Entity()
export class RentalHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  rentalDate: string

  @Column({})
  returnDate: string

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.rentalHistorys)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({ nullable: true })
  carId?: string

  @ManyToOne(() => Car, parent => parent.rentalHistorys)
  @JoinColumn({ name: 'carId' })
  car?: Car

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
