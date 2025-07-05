import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CatDetails, DogDetails, FarmAnimalDetails, HorseDetails } from '#src/shared';
import { tables } from '#src/shared/lib/constants';

const { pets } = tables;

@Entity(pets)
export class Pet {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  lk_pet_code: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  breed: string;

  @Column({ type: 'varchar', nullable: false })
  specie: string;

  @Column({ type: 'varchar', nullable: false })
  sex_txt: string;

  @Column({ type: 'boolean', default: false })
  is_available: boolean;

  @Column({ type: 'boolean', default: false })
  is_sterilized_flg: boolean;

  @Column({ type: 'varchar' })
  health: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  updated_at: Date;

  // Relations
  @OneToOne(() => DogDetails, dogDetails => dogDetails.pet, { cascade: true })
  dogDetails?: DogDetails;

  @OneToOne(() => CatDetails, catDetails => catDetails.pet, { cascade: true })
  catDetails?: CatDetails;

  @OneToOne(() => HorseDetails, horseDetails => horseDetails.pet, { cascade: true })
  horseDetails?: HorseDetails;

  @OneToOne(() => FarmAnimalDetails, farmAnimalDetails => farmAnimalDetails.pet, { cascade: true })
  farmAnimalDetails?: FarmAnimalDetails;
}
