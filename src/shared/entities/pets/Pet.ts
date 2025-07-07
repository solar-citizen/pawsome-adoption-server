import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  CatDetails,
  DogDetails,
  FarmAnimalDetails,
  HorseDetails,
  type ICatDetails,
  type IDogDetails,
  type IFarmAnimalDetails,
  type IHorseDetails,
  type IPet,
  LK_PET_CODE_LENGTH,
  type Specie,
  unionValues,
} from '#src/shared';
import { tables } from '#src/shared/lib/constants';

const { pets } = tables;
const { SPECIES } = unionValues;

@Entity(pets)
export class Pet implements IPet {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: LK_PET_CODE_LENGTH, unique: true, nullable: false })
  lk_pet_code: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  breed: string;

  @Column({ type: 'enum', enum: SPECIES, nullable: false })
  specie: Specie;

  @Column({ type: 'varchar', nullable: false })
  sex_txt: string;

  @Column({ type: 'varchar', length: 255 })
  special_needs: string | null;

  @Column({ type: 'varchar', length: 255 })
  health: string | null;

  @Column({ type: 'boolean', default: false, nullable: false })
  is_available: boolean;

  @Column({ type: 'boolean', default: false, nullable: false })
  is_sterilized_flg: boolean;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  updated_at: Date;

  // Relations
  @OneToOne(() => DogDetails, dogDetails => dogDetails.pet, { cascade: true })
  dogDetails?: IDogDetails;

  @OneToOne(() => CatDetails, catDetails => catDetails.pet, { cascade: true })
  catDetails?: ICatDetails;

  @OneToOne(() => HorseDetails, horseDetails => horseDetails.pet, { cascade: true })
  horseDetails?: IHorseDetails;

  @OneToOne(() => FarmAnimalDetails, farmAnimalDetails => farmAnimalDetails.pet, { cascade: true })
  farmAnimalDetails?: IFarmAnimalDetails;
}
