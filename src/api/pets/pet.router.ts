import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '#src/shared';

import { petController } from './pet.controller';

const upload = multer(uploadConfig);
const petRouter = Router();

const { createPet, getPets } = petController;

petRouter.get('/pets', getPets);
petRouter.post(
  '/pets',
  upload.fields([
    { name: 'photos', maxCount: 5 },
    { name: 'documents', maxCount: 5 },
  ]),
  createPet,
);

export { petRouter };
