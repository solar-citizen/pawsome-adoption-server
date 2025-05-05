import { Router } from 'express'

import { petController } from './petController'

const petRouter = Router()

const { addPet, getPets } = petController

petRouter.get('/pets', getPets)
petRouter.post('/pets/add', addPet)

export { petRouter }
