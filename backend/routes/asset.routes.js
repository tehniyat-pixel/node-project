import express from 'express';
import {
  createAsset,
  getAllAssets,
  deleteAsset,
} from '../controllers/asset.controller.js';
import  upload  from '../middlewares/upload.js';

const assetRoutes = express.Router();

assetRoutes.post('/',upload.single('file'), createAsset);
assetRoutes.get('/', getAllAssets);
assetRoutes.delete('/:id', deleteAsset);





export default assetRoutes;

