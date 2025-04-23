import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { constants } from '#/lib'

const { pets } = constants.tables

@Entity(pets)
export class Pet {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 20, unique: true, nullable: false })
  lk_pet_code: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  breed: string

  @Column({ nullable: false })
  specie: string

  @Column({ default: false })
  is_available: boolean

  @Column({ default: false })
  is_house_trained: boolean

  @Column()
  health: string

  @CreateDateColumn({ nullable: false })
  created_at: Date

  @UpdateDateColumn({ nullable: false })
  updated_at: Date
}
