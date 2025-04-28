import { Router } from 'express'
import { PetController } from '#/controllers'

const petRoutes = Router()

petRoutes.get('/pets', PetController.getPets)
petRoutes.post('/pets/add', PetController.addPet)

export { petRoutes }
