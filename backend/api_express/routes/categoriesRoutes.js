import express from "express";
import * as categoriesController from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/categories', categoriesController.showCategories)
router.get('/categories/:idCategory', categoriesController.showCategory)
router.post('/categories', categoriesController.newCategory)
router.delete('/categories/:idCategory', categoriesController.deleteCategory)
export default router;