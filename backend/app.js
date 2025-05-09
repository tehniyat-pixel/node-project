import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import sequelize from './sequelize.js';
import Asset from './models/Asset.js';
import assetRoutes from './routes/assets.js';
import cors from 'cors';

AdminJS.registerAdapter(AdminJSSequelize);
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // your React app, NOT backend port!
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// AdminJS config
const adminJs = new AdminJS({
  resources: [Asset],
  rootPath: '/admin',
});
const router = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, router);

// Your API routes
app.use('/api/assets', assetRoutes);

// Server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`AdminJS is at http://localhost:${PORT}${adminJs.options.rootPath}`);
});
