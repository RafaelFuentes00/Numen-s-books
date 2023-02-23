import express from "express";
import * as booksController from '../controllers/booksController.js';

const router = express.Router();

router.get('/books', booksController.showBooks)
router.get('/books/:idBook', booksController.showBook)
router.post('/books', booksController.upload, booksController.newBook)
router.delete('/books/:idBook', booksController.deleteBook)
export default router;