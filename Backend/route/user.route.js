import express from 'express';
import {allUsers, login, signup} from '../controller/user.controller.js';
import secureRoute from '../middleware/secureRoute.js';
const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/allUsers',secureRoute,allUsers);
export default router;