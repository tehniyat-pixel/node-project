import express from 'express';
import {
  createSubcategory,
  getSubcategoriesByCategory,
  
} from '../controllers/subcategory.controller.js';

const subCategoryRoutes = express.Router();

subCategoryRoutes.post('/', createSubcategory);
subCategoryRoutes.get('/', getSubcategoriesByCategory);

export default subCategoryRoutes;
