import { Router } from 'express'

import { petRoutes } from './petRoutes'

const router = Router()

router.use('/api', petRoutes) // toDo: unify /api for all routes, not only to petRoutes

export { router }