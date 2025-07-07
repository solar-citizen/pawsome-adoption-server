import { z } from 'zod';

import { LK_PET_CODE_LENGTH, unionValues } from '#src/shared';

const { SPECIES } = unionValues;

const basePetSchema = z.object({
  lk_pet_code: z.string().length(LK_PET_CODE_LENGTH),
  name: z.string().min(1).max(100),
  breed: z.string().min(1).max(100),
  specie: z.enum(SPECIES).default('other'),
  sex_txt: z.string().min(1).max(10),
  special_needs: z.string().max(255).nullish(),
  health: z.string().max(255).nullish(),
  is_available: z.boolean().optional().default(false),
  is_sterilized_flg: z.boolean().optional().default(false),

  // toDo: add other optional entities schema validation if required
});

const lkPetCodeSchema = z.object({
  lk_pet_code: basePetSchema.shape.lk_pet_code,
});

export const PetSchema = {
  create: basePetSchema,
  update: basePetSchema.omit({ lk_pet_code: true }).partial(),
  delete: lkPetCodeSchema,
  read: lkPetCodeSchema,
};

// export const PetQuerySchema = z.object({
//   page: z.number().min(1).default(1),
//   limit: z.number().min(1).max(100).default(10),
//   search: z.string().optional(),
// });
