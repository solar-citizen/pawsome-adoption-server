import { NextFunction, Request, Response } from 'express'
import asyncHandler = require('express-async-handler')

import { Pet } from '@/src/entities'
import { AppDataSource } from '@/src/config'

const petRepo = AppDataSource.getRepository(Pet)

export const PetController = {
  getPets: asyncHandler(async (_req: Request, res: Response) => {
    res.json('getPets')
    // const pets = await petRepo.find();
    // res.json(pets);
  }),

  addPet: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.json('createPet')
    // const pet = petRepo.create(req.body);
    // const savedPet = await petRepo.save(pet);
    // res.status(201).json(savedPet);
  }),
}