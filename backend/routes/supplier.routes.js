import express from 'express';
import {
  createSupplier,
  getAllSuppliers,
  
} from '../controllers/supplier.controller.js';

const supplierRoutes = express.Router();

supplierRoutes.post('/', createSupplier);
supplierRoutes.get('/', getAllSuppliers);

export default supplierRoutes;
