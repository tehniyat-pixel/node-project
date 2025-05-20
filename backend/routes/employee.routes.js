import express from 'express';
import {
  createEmployee,
  getAllEmployees,
  
} from '../controllers/employee.controller.js';

const employeeRoutes = express.Router();

employeeRoutes.post('/', createEmployee);
employeeRoutes.get('/', getAllEmployees);

export default employeeRoutes;
