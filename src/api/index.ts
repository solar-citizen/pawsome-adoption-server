import { Router } from 'express';

import { routes } from '#/shared';

import { petRouter } from './pets/petRouter';

const router = Router();
const { api } = routes;

router.use(api, petRouter);

export { router };
