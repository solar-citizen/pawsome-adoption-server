import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { AppDataSource, Pet, PetWithDetails, withPagination } from '#src/shared';

import { getSpeciesFiles, stripFiles } from './lib/helpers';
import { PetService } from './pet.service';

type PetRequestBody = {
  petData?: string | object;
  [key: string]: unknown;
};

const petRepository = AppDataSource.getRepository(Pet);
const petWithDetailsRepository = AppDataSource.getRepository(PetWithDetails);

const petService = new PetService(petRepository, petWithDetailsRepository);

export const petController = {
  getPets: asyncHandler(async (req: Request, res: Response) => {
    const result =
      req.query.detailed === 'true'
        ? await withPagination(req, petService.getPaginatedPetsWithDetails)
        : await withPagination(req, petService.getPaginatedPets);
    res.json(result);
  }),

  getPetByCode: asyncHandler(async (req: Request, res: Response) => {
    const { lk_pet_code } = req.params;
    const pet = await petService.getPetByCode(lk_pet_code);
    if (!pet) {
      res.status(404).json({ message: 'Pet not found' });
      return;
    }
    res.json(pet);
  }),

  getPetByCodeWithSpeciesDetails: asyncHandler(async (req: Request, res: Response) => {
    const { lk_pet_code } = req.params;
    const pet = await petService.getPetByCodeWithSpeciesDetails(lk_pet_code);
    if (!pet) {
      res.status(404).json({ message: 'Pet not found' });
      return;
    }
    res.json(pet);
  }),

  getPetByCodeWithSpeciesDetailsAndSimilarPets: asyncHandler(
    async (req: Request, res: Response) => {
      const { lk_pet_code } = req.params;
      const { main, similar } =
        await petService.getPetByCodeWithSpeciesDetailsAndSimilarPets(lk_pet_code);

      if (!main) {
        res.status(404).json({ error: 'Pet not found.' }).end();
        return;
      }

      const { photos, documents } = getSpeciesFiles(main);
      const cleanedMain = stripFiles(main);

      res.json({ main: cleanedMain, photos, documents, similar });
    },
  ),

  createPet: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const body = req.body as PetRequestBody;
    let petData: unknown;

    if (typeof body === 'object' && 'petData' in body && body.petData !== undefined) {
      const rawPetData = body.petData;
      try {
        petData = typeof rawPetData === 'string' ? JSON.parse(rawPetData) : rawPetData;
      } catch (err) {
        console.error('JSON parsing error:', err);
        res.status(400).json({ error: 'Invalid JSON format in petData field' });
        return;
      }
    } else {
      petData = body;
    }

    try {
      const savedPet = await petService.createPet(
        petData,
        req.files as Express.Multer.File[] | null,
      );
      res.status(201).json(savedPet);
    } catch (err) {
      console.error('Error creating pet:', err);
      res.status(500).json({ error: 'Failed to create pet' });
    }
  }),
};
