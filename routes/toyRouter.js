// routes/toyRouter.js
import express from "express";
const router = express.Router();
import {
  getToys,
  getToyById,
  createToy,
  updateToyById,
  deleteToyById,
} from '../controllers/toyController';

router.get('/allToy', getToys);
router.get('/allToy/:id', getToyById);
router.post('/postallToy', createToy);
router.delete('/allToy/:id', deleteToyById);
router.patch('/allToy/details/:id', updateToyById);

// Add more routes as needed

export default router;
