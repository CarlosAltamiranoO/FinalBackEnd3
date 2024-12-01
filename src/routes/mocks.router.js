import { Router } from 'express';
import petController from '../controllers/mocks.controller.js';
import usersController from '../controllers/users.controller.js';

const router = Router();

router.get("/mockingpets", petController.getMockingPets);

//router.get("/mockingusers", usersController.getMockingUsers);


export default router;