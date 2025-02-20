import { Router } from 'express'
import { PetController } from '@/src/controllers'

const petRoutes = Router()

petRoutes.get('/pets', PetController.getPets)
petRoutes.post('/add-pet', PetController.addPet)

export { petRoutes }