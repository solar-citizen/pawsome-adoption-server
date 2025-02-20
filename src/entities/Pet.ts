import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  breed: string

  @Column({ default: false })
  available: boolean
}