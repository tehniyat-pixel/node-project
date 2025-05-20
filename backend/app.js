import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSSequelize from '@adminjs/sequelize';

// Register the Sequelize adapter
AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});
import { ComponentLoader } from 'adminjs';
import cors from 'cors';
import path from 'path';

import { fileURLToPath } from 'url';

// Custom API Routes
import assetRoutes from './routes/asset.routes.js';
import categoryRoutes from './routes/category.routes.js';
import subCategoryRoutes from './routes/subcategory.routes.js';
import departmentRoutes from './routes/department.routes.js';
import locationRoutes from './routes/location.routes.js';
import employeeRoutes from './routes/employee.routes.js';
import supplierRoutes from './routes/supplier.routes.js';

// DB and Models
import sequelize from './sequelize.js';
import {
  Asset,
  AssetCategory,
  AssetSubCategory,
  Department,
  Employee,
  Supplier,
  Office,
  VirtualAssetRegistration
} from './models/index.js';

// Register Sequelize adapter
AdminJS.registerAdapter(AdminJSSequelize);
const bundle = AdminJS.bundle || ((path) => path);


// Initialize AdminJS
const adminJs = new AdminJS({
  databases: [sequelize],
   
  rootPath: '/admin',
   

  branding: {
    companyName: 'Asset Management System',
    logo: '/asset/frontend/frontend/public/icon.png',
    favicon: '/asset/frontend/frontend/public/icon.png',
    theme: {
      colors: {
        primary100: '#4f46e5',
        primary80: '#6366f1',
        primary60: '#818cf8',
        primary40: '#a5b4fc',
        primary20: '#c7d2fe',
      }
    }
  },
  locale: {
    language: 'en',
    translations: {
      labels: {
        QuickAssetRegistration: 'Quick Registration',
        Asset: 'Assets',
        AssetCategory: 'Categories',
        AssetSubCategory: 'Subcategories',
        Office: 'Offices',
        Department: 'Departments',
        Employee: 'Employees',
        Supplier: 'Suppliers'
      }
    }
  },
  resources: [
    {
      resource: Asset,
      
    },
    {
      resource: AssetCategory,
      
    },
    {
      resource: AssetSubCategory,
      
    },
    {
      resource: Office,
      
    },
    {
      resource: Department,
     
    },
    {
      resource: Employee,
     
    },
    {
      resource: Supplier,
      
    },
   
  ]
  
});

// Build Express Router for AdminJS
const adminRouter = AdminJSExpress.buildRouter(adminJs);

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// AdminJS route
app.use(adminJs.options.rootPath, adminRouter);

// API Routes
app.use('/api/assets', assetRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/locations', locationRoutes); // Office locations
app.use('/api/employees', employeeRoutes);
app.use('/api/suppliers', supplierRoutes);

// Start Server
const PORT = process.env.PORT || 3001;

sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected...');
    return sequelize.sync(); // { force: true } if resetting
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`🛠️ AdminJS available at http://localhost:${PORT}${adminJs.options.rootPath}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });

export default app;
