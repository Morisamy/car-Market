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

import { SparePart } from '../../../modules/sparePart/domain'

@Entity()
export class PurchaseHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  purchaseDate: string

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.purchaseHistorys)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({ nullable: true })
  sparePartId?: string

  @ManyToOne(() => SparePart, parent => parent.purchaseHistorys)
  @JoinColumn({ name: 'sparePartId' })
  sparePart?: SparePart

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
