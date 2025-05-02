import { Request, Response } from 'express'
import { ILike } from 'typeorm'

import { Pet } from '#/entities'
import { AppDataSource } from '#/config'
import asyncHandler = require('express-async-handler')

const petRepository = AppDataSource.getRepository(Pet)

export const petController = {
  /**
   * Get all pets with pagination support
   *
   * Query params:
   * - page: Current page number (1-indexed)
   * - limit: Number of items per page
   * - full_text_search: search string
   *
   * Returns paginated pets with metadata
   */
  getPets: asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const offset = (page - 1) * limit
    const fullTextSearch = req.query.full_text_search || null

    // Fetch data and it's count based on pagination offset and params
    const [pets, petsTotal] = await Promise.all([
      petRepository.find({
        skip: offset,
        take: limit,
        where: fullTextSearch ? [{ name: ILike(`%${fullTextSearch}%`) }] : {},
        order: { lk_pet_code: 'ASC' },
      }),
      petRepository.count(),
    ])

    // Calculate pagination metadata
    const petsFrom = petsTotal > 0 ? offset + 1 : 0
    const petsTo = petsTotal > 0 ? Math.min(offset + limit, petsTotal) : 0
    const lastPage = Math.max(Math.ceil(petsTotal / limit), 1)

    res.json({
      data: pets,
      meta: {
        // always ≥ 1
        currentPage: page,
        // items per page
        perPage: limit,
        // always ≥ 1
        lastPage,
        // 0 if no items
        petsFrom,
        // 0 if no items
        petsTo,
        // total count (0 if none)
        petsTotal,
      },
    })
  }),

  addPet: asyncHandler(async (req: Request, res: Response) => {
    res.json('createPet')
    // const pet = petRepo.create(req.body);
    // const savedPet = await petRepo.save(pet);
    // res.status(201).json(savedPet);
  }),
}
