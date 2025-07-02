import { Router } from 'express';

import { petController } from './pet.controller';

const petRouter = Router();

const { getPets, createPet } = petController;

petRouter.get('/pets', getPets);
petRouter.post('/pets/add', createPet);

export { petRouter };
