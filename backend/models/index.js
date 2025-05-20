import sequelize from '../sequelize.js';

// Import all models
import Asset from './asset.model.js';
import AssetCategory from './category.model.js';
import AssetSubCategory from './subcategory.model.js';
import Office from './office.model.js';
import Department from './department.model.js';
import Employee from './employee.model.js';
import Supplier from './supplier.model.js';
import VirtualAssetRegistration from './VirtualAssetRegistration.js';


// Define relationships


Asset.belongsTo(AssetSubCategory, { foreignKey: 'subCategoryId' })
AssetSubCategory.hasMany(Asset, { foreignKey: 'subCategoryId' })

// An Asset belongs to one category
Asset.belongsTo(AssetCategory, { foreignKey: 'categoryId' });
// A Category can have many Assets
AssetCategory.hasMany(Asset, { foreignKey: 'categoryId' });

// A Category can have many Subcategories
AssetCategory.hasMany(AssetSubCategory, { foreignKey: 'categoryId' });
// A Subcategory belongs to one Category
AssetSubCategory.belongsTo(AssetCategory, { foreignKey: 'categoryId' });

// An Asset belongs to one Office
Asset.belongsTo(Office, { foreignKey: 'officeId' });
// An Office can have many Assets
Office.hasMany(Asset, { foreignKey: 'officeId' });

// An Asset belongs to one Department
Asset.belongsTo(Department, { foreignKey: 'departmentId' });
// A Department can have many Assets
Department.hasMany(Asset, { foreignKey: 'departmentId' });

// An Asset belongs to one Employee
Asset.belongsTo(Employee, { foreignKey: 'employeeId' });
// An Employee can have many Assets
Employee.hasMany(Asset, { foreignKey: 'employeeId' });

// An Asset belongs to one Supplier
Asset.belongsTo(Supplier, { foreignKey: 'supplierId' });
// A Supplier can have many Assets
Supplier.hasMany(Asset, { foreignKey: 'supplierId' });

const syncDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // This will sync your models with the DB
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Database synchronization failed:', error);
  }
};

export {
  sequelize,
  Asset,
  AssetCategory,
  AssetSubCategory,
  Office,
  Department,
  Employee,
  Supplier,
  syncDB,
};
export { default as VirtualAssetRegistration } from './VirtualAssetRegistration.js'
// Add to your models/index.js
