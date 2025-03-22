import { Request, Response } from 'express'

import { Pet } from '@/src/entities'
import { AppDataSource } from '@/src/config'
import asyncHandler = require('express-async-handler')

const petRepository = AppDataSource.getRepository(Pet)

export const PetController = {
  getAllPets: asyncHandler(async (_req: Request, res: Response) => {
    const pets = await petRepository.find()
    res.json(pets)
  }),

  addPet: asyncHandler(async (req: Request, res: Response) => {
    res.json('createPet')
    // const pet = petRepo.create(req.body);
    // const savedPet = await petRepo.save(pet);
    // res.status(201).json(savedPet);
  }),
}