// backend/app.js
import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import sequelize from './sequelize.js';  // Import your Sequelize instance
import Asset from './models/Asset.js';  // Your Asset model
import assetRoutes from './routes/assets.js';  // Import asset routes correctly
import cors from 'cors';

AdminJS.registerAdapter(AdminJSSequelize);
const app = express();

// AdminJS configuration
const adminJs = new AdminJS({
  resources: [Asset],  // Define which models you want to manage
  rootPath: '/admin',  // The URL path where AdminJS will be accessible
});

const router = AdminJSExpress.buildRouter(adminJs);

// Mount the AdminJS dashboard
app.use(adminJs.options.rootPath, router);
// Server setup
const PORT = 3001;  // Change the port if needed
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`AdminJS is at http://localhost:${PORT}${adminJs.options.rootPath}`);
  
});


// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for frontend to communicate with backend
app.use(cors({
  origin: 'http://localhost:3001',  // React app running on this port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Use the asset routes for /api/assets
app.use('/api/assets', assetRoutes);  // Register the routes with the prefix `/api/assets`


