import { Router } from 'express'
import { PetController } from '#/controllers'

const petRoutes = Router()

petRoutes.get('/pets', PetController.getAllPets)
petRoutes.post('/add-pet', PetController.addPet)

export { petRoutes }
