// admin.js
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import Asset from './models/Asset.js';

AdminJS.registerAdapter(AdminJSSequelize);

const admin = new AdminJS({
  resources: [Asset],
  rootPath: '/admin',
});

const adminRouter = AdminJSExpress.buildRouter(admin);

export { admin, adminRouter };
