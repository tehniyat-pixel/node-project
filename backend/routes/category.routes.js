import express from 'express';
import {
  createCategory,
  getAllCategories,

} from '../controllers/category.controller.js';

const categoryRoutes = express.Router();

categoryRoutes.post('/', createCategory);
categoryRoutes.get('/', getAllCategories);

export default categoryRoutes;
