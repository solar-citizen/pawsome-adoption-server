import { z } from 'zod';

import { LK_PET_CODE_LENGTH, unionValues } from '#src/shared';

const { SPECIES } = unionValues;

const basePetSchema = z.object({
  lk_pet_code: z.string().length(LK_PET_CODE_LENGTH),
  name: z.string().min(1).max(100),
  description_txt: z.string().max(1000).optional().nullish(),
  age_int: z.number().max(200).optional().nullish(),
  breed: z.string().min(1).max(100),
  specie: z.enum(SPECIES),
  sex_txt: z.string().min(1).max(10),
  special_needs: z.string().max(255).nullish(),
  health: z.string().max(255).nullish(),
  is_available: z.boolean().optional().default(false),
  is_sterilized_flg: z.boolean().optional().default(false),
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

const filesSchema = z
  .object({
    photos: z.array(z.string().url()).optional().default([]),
    documents: z.array(z.string().url()).optional().default([]),
  })
  .nullable()
  .optional();

export const catDetailsSchema = z.object({
  is_litter_trained: z.boolean().default(false),
  is_indoor_only: z.boolean().default(false),
  is_declawed: z.boolean().default(false),
  personality_type: z.string().max(50).nullish(),
  good_with_children: z.boolean().default(false),
  good_with_other_cats: z.boolean().default(false),
  good_with_dogs: z.boolean().default(false),
  needs_special_diet: z.boolean().default(false),
  files: filesSchema,
});

export const dogDetailsSchema = z.object({
  is_house_trained: z.boolean().default(false),
  training_level: z.string().max(50).nullish(),
  good_with_children: z.boolean().default(false),
  good_with_other_dogs: z.boolean().default(false),
  good_with_cats: z.boolean().default(false),
  energy_level: z.string().max(50).nullish(),
  exercise_needs_minutes: z.number().int().nullable().optional(),
  files: filesSchema,
});

export const horseDetailsSchema = z.object({
  is_saddle_trained: z.boolean().default(false),
  is_ground_trained: z.boolean().default(false),
  riding_level: z.string().max(50).nullish(),
  height_hands: z.number().nullable().optional(),
  weight_lbs: z.number().int().nullable().optional(),
  discipline: z.string().max(50).nullish(),
  temperament: z.string().max(50).nullish(),
  suitable_for_beginners: z.boolean().default(false),
  files: filesSchema,
});

export const farmAnimalDetailsSchema = z.object({
  is_fence_trained: z.boolean().default(false),
  primary_purpose: z.string().max(50).nullish(),
  requires_special_housing: z.boolean().default(false),
  housing_requirements: z.string().max(255).nullish(),
  good_with_herd: z.boolean().default(false),
  needs_companion: z.boolean().default(false),
  special_care_needs: z.string().max(255).nullish(),
  pasture_size_needed: z.string().max(50).nullish(),
  files: filesSchema,
});

/**
 * Combined Pet create schema by extending the base schema
 * with optional species details.
 */
export const PetCreateSchema = basePetSchema.extend({
  catDetails: catDetailsSchema.optional(),
  dogDetails: dogDetailsSchema.optional(),
  horseDetails: horseDetailsSchema.optional(),
  farmAnimalDetails: farmAnimalDetailsSchema.optional(),
});
