import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { withPagination } from '#src/shared';

import { petService } from './pet.service';

export const petController = {
  getPets: asyncHandler(async (req: Request, res: Response) => {
    const result =
      req.query.detailed === 'true'
        ? await withPagination(req, petService.getPaginatedPetsWithDetails)
        : await withPagination(req, petService.getPaginatedPets);
    res.json(result);
  }),

  createPet: asyncHandler(async (req: Request, res: Response) => {
    const savedPet = await petService.createPet(req.body);
    res.status(201).json(savedPet);
  }),
};
