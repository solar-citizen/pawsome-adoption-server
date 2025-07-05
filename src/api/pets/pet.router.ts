import { Router } from 'express';

import { petController } from './pet.controller';

const petRouter = Router();

const { createPet, getPets } = petController;

petRouter.get('/pets', getPets);
petRouter.post('/pets', createPet);

export { petRouter };
