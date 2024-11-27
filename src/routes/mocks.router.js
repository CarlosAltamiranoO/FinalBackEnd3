import { Router } from 'express';
import controller from '../controllers/mocks.controller.js';
import usersController from '../controllers/users.controller.js';

const router = Router();

router.get("/mockingpets", controller.getMockingPets);
/* router.post("/mockingpets", petsController.postMockingPets);
router.get("/mockingusers", usersController.getMockingUsers);
router.post("/mockingusers", usersController.postMockingUsers);*/

export default router;