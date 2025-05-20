import express from 'express';
import {
  createDepartment,
  getDepartmentsByOffice,
  
} from '../controllers/department.controller.js';

const departmentRoutes = express.Router();

departmentRoutes.post('/', createDepartment);
departmentRoutes.get('/', getDepartmentsByOffice);


export default departmentRoutes;
