import { Router } from 'express'

import { petRoutes } from './petRoutes'

const router = Router()

router.use('/', petRoutes)

export { router }