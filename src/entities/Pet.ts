import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { constants } from '@/src/lib'

const { pets } = constants.tables

@Entity(pets)
export class Pet {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  breed: string

  @Column({ default: false })
  is_available: boolean

  @Column({ default: false })
  is_house_trained: boolean

  @Column()
  health: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}