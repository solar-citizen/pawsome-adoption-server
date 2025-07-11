import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { type IFarmAnimalDetails, type IPet, Pet } from '#src/shared';
import { tables } from '#src/shared/lib/constants';

const { farmAnimalsDetails } = tables;

@Entity(farmAnimalsDetails)
export class FarmAnimalDetails implements IFarmAnimalDetails {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  lk_pet_code: string;

  @Column({ type: 'int', unique: true })
  pet_id: number;

  @Column({ type: 'boolean', default: false })
  is_fence_trained: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'Primary purpose: dairy, meat, fiber, companion, breeding',
  })
  primary_purpose: string;

  @Column({ type: 'boolean', default: false })
  requires_special_housing: boolean;

  @Column({ type: 'varchar', nullable: true })
  housing_requirements: string;

  @Column({ type: 'boolean', default: false })
  good_with_herd: boolean;

  @Column({ type: 'boolean', default: false })
  needs_companion: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'Special care: milking, shearing, hoof_trimming',
  })
  special_care_needs: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'Pasture requirements: small, medium, large',
  })
  pasture_size_needed: string;

  @Column({ type: 'jsonb', nullable: true })
  files: {
    photos: string[];
    documents: string[];
  } | null;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  updated_at: Date;

  @OneToOne(() => Pet, pet => pet.farmAnimalDetails)
  @JoinColumn({ name: 'pet_id' })
  pet: IPet;
}
