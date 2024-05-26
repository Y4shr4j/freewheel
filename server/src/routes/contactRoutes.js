import express from 'express';
import { createContact, getAllContacts } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', createContact);
router.get('/', getAllContacts); // Route to get all contacts

export default router;
