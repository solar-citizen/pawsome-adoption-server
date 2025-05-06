import { Router } from 'express';

import { petController } from './petController';

const petRouter = Router();

const { getPets } = petController;

petRouter.get('/pets', getPets);
// petRouter.post('/pets/add', addPet);

export { petRouter };
