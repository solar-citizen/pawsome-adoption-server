import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Pet } from '#src/shared';
import { tables } from '#src/shared/lib/constants';

const { horseDetails } = tables;

@Entity(horseDetails)
export class HorseDetails {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  lk_pet_code: string;

  @Column({ type: 'int', unique: true })
  pet_id: number;

  @Column({ type: 'boolean', default: false })
  is_saddle_trained: boolean;

  @Column({ type: 'boolean', default: false })
  is_ground_trained: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'Riding level: beginner, intermediate, advanced, professional',
  })
  riding_level: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
    comment: 'Height in hands (1 hand = 4 inches)',
  })
  height_hands: number;

  @Column({
    type: 'int',
    nullable: true,
    comment: 'Weight in pounds',
  })
  weight_lbs: number;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'Discipline: dressage, jumping, trail, western, racing',
  })
  discipline: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'Temperament: calm, spirited, gentle, nervous',
  })
  temperament: string;

  @Column({ type: 'boolean', default: false })
  suitable_for_beginners: boolean;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  updated_at: Date;

  @OneToOne(() => Pet, pet => pet.horseDetails)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;
}
