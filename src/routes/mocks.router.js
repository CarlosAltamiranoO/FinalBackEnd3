import { Router } from 'express';
import Controller from '../controllers/mocks.controller.js';
import usersController from '../controllers/users.controller.js';

const router = Router();

router.get("/mockingpets", Controller.getMockingPets);

router.get("/mockingusers", Controller.getMockingUsers);


export default router;