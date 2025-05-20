import express from 'express';
import {
  createLocation,
  getAllLocations,
  
} from '../controllers/location.controller.js';

const locationRoutes = express.Router();

locationRoutes.post('/', createLocation);
locationRoutes.get('/', getAllLocations);


export default locationRoutes;
