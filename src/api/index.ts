import { Router } from 'express';

import { routes } from '#src/shared';

import { petRouter } from './pets/pet.router';

const router = Router();
const { api } = routes;

router.use(api, petRouter);

export { router };
