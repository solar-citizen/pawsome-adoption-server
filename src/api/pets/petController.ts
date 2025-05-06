import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { petService } from './petService';

export const petController = {
  getPets: asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const fullTextSearch = req.query.full_text_search || null;

    const result = await petService.getPaginatedPets(page, limit, fullTextSearch as string);
    res.json(result);
  }),

  // addPet: asyncHandler(async (req: Request, res: Response) => {
  //   const savedPet = await petService.createPet(req.body);
  //   res.status(201).json(savedPet);
  // }),
};
