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

const { dogDetails } = tables;

export type DogDetailsType = {
  id: number;
  pet_id: number;
  lk_pet_code: string;
  is_house_trained: boolean;
  training_level: TrainingLevel | null;
  good_with_children: boolean;
  good_with_other_dogs: boolean;
  good_with_cats: boolean;
  energy_level: EnergyLevel | null;
  exercise_needs_minutes: number | null;
  created_at: Date;
  updated_at: Date;
  pet: Pet;
};
export type TrainingLevel = 'basic' | 'intermediate' | 'advanced';
export type EnergyLevel = 'low' | 'moderate' | 'high' | 'very_high';
export type CreateDogDetailsInput = Omit<
  DogDetailsType,
  'id' | 'created_at' | 'updated_at' | 'pet'
>;
export type UpdateDogDetailsInput = Partial<
  Omit<DogDetailsType, 'id' | 'created_at' | 'updated_at' | 'pet'>
> & {
  id: number;
};

@Entity(dogDetails)
export class DogDetails implements DogDetailsType {
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

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  updated_at: Date;

  @OneToOne(() => Pet, pet => pet.dogDetails)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;
}
