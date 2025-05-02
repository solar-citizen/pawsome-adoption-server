import { Router } from 'express'
import { petController } from '#/controllers'

const petRoutes = Router()

const { addPet, getPets } = petController

petRoutes.get('/pets', getPets)
petRoutes.post('/pets/add', addPet)

export { petRoutes }
