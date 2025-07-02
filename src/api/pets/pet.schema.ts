import { z } from 'zod';

const basePetSchema = z.object({
  lk_pet_code: z.string().min(1).max(20),
  name: z.string().min(1),
  breed: z.string().min(1),
  specie: z.string().min(1),
  is_available: z.boolean().optional().default(false),
  is_house_trained: z.boolean().optional().default(false),
  health: z.string().optional(),
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
