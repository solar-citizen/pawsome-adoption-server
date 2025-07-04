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

const { catDetails } = tables;

@Entity(catDetails)
export class CatDetails {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  lk_pet_code: string;

  @Column({ type: 'int', unique: true })
  pet_id: number;

  @Column({ type: 'boolean', default: false })
  is_litter_trained: boolean;

  @Column({ type: 'boolean', default: false })
  is_indoor_only: boolean;

  @Column({ type: 'boolean', default: false })
  is_declawed: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'Personality: playful, calm, social, independent, shy, aggressive',
  })
  personality_type: string;

  @Column({ type: 'boolean', default: false })
  good_with_children: boolean;

  @Column({ type: 'boolean', default: false })
  good_with_other_cats: boolean;

  @Column({ type: 'boolean', default: false })
  good_with_dogs: boolean;

  @Column({ type: 'boolean', default: false })
  needs_special_diet: boolean;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  updated_at: Date;

  @OneToOne(() => Pet, pet => pet.catDetails)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;
}
