import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  type EnergyLevel,
  type IDogDetails,
  type IPet,
  Pet,
  type TrainingLevel,
} from '#src/shared';
import { tables } from '#src/shared/lib/constants';

const { dogDetails } = tables;

@Entity(dogDetails)
export class DogDetails implements IDogDetails {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  lk_pet_code: string;

  @Column({ type: 'int', unique: true })
  pet_id: number;

  @Column({ type: 'boolean', default: false })
  is_house_trained: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'Training level: basic, intermediate, advanced',
  })
  training_level: TrainingLevel;

  @Column({ type: 'boolean', default: false })
  good_with_children: boolean;

  @Column({ type: 'boolean', default: false })
  good_with_other_dogs: boolean;

  @Column({ type: 'boolean', default: false })
  good_with_cats: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'Energy level: low, moderate, high, very_high',
  })
  energy_level: EnergyLevel;

  @Column({
    type: 'int',
    nullable: true,
    comment: 'Exercise needs in minutes per day',
  })
  exercise_needs_minutes: number;

  @Column({ type: 'jsonb', nullable: true })
  files: {
    photos: string[];
    documents: string[];
  } | null;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  updated_at: Date;

  @OneToOne(() => Pet, pet => pet.dogDetails)
  @JoinColumn({ name: 'pet_id' })
  pet: IPet;
}
