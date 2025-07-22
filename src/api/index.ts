import { Router } from 'express';

import { routes } from '#src/shared';

import { mviewRouter } from './mviews/mview.router';
import { petRouter } from './pets/pet.router';

const router = Router();
const { api } = routes;

router.use(api, petRouter);
router.use(api, mviewRouter);

export { router };
