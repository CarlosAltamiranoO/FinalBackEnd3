import { Router } from 'express';
import Controller from '../controllers/mocks.controller.js';
import usersController from '../controllers/users.controller.js';
import petsController from '../controllers/pets.controller.js';

const router = Router();

router.get("/mockingpets", Controller.getMockingPets);
router.get("/mockingusers", Controller.getMockingUsers);
router.post("/generatedata", Controller.generateData);

router.get("/pets", petsController.getAllPets);
router.get("/users", usersController.getAllUsers);



export default router;