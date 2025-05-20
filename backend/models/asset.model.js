import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
  
const Asset = sequelize.define('Asset', {
  asset_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  asset_barcode: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  asset_cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  purchase_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  delivery_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  asset_life: {
    type: DataTypes.INTEGER, // in months or years
    allowNull: true, // Will be calculated
  },
  depreciation_rate: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  appreciation_rate: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  current_value: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: true, // auto-calculated
  },
  file_path: {
  type: DataTypes.STRING,
  allowNull: true,
},
  categoryId: {
    type: DataTypes.INTEGER,
    references: { model: 'asset_categories', key: 'id' }, // Foreign key reference to AssetCategory
  },
  subCategoryId: {
    type: DataTypes.INTEGER,
    references: { model: 'asset_subcategories', key: 'id' }, // Foreign key reference to AssetSubCategories
  },
  officeId: {
    type: DataTypes.INTEGER,
    references: { model: 'offices', key: 'id' }, // Foreign key reference to Office
  },
  departmentId: {
    type: DataTypes.INTEGER,
    references: { model: 'departments', key: 'id' }, // Foreign key reference to Department
  },
  employeeId: {
    type: DataTypes.INTEGER,
    references: { model: 'employees', key: 'id' }, // Foreign key reference to Employee
  },
  supplierId: {
    type: DataTypes.INTEGER,
    references: { model: 'suppliers', key: 'id' }, // Foreign key reference to Supplier
  },
  barcodeImageUrl: {
  type: DataTypes.VIRTUAL,
  get() {
    return `/api/assets/${this.getDataValue('asset_id')}/barcode`;
  },
},
}, {
  tableName: 'assets',
  timestamps: true,
});

// Function to calculate asset_life and current_value
const calculateCurrentValue = (asset) => {
  const today = dayjs();
  const purchaseDate = dayjs(asset.purchase_date);

  // Asset life is the total time since purchase
  const assetLifeYears = today.diff(purchaseDate, 'year');
  asset.asset_life = assetLifeYears;

   const cost = parseFloat(asset.asset_cost);
  // Simple straight-line depreciation
 
  const currentValue = ((((cost)*(asset.depreciation_rate))/100)*asset.asset_life);
  asset.current_value = currentValue;

};
Asset.beforeCreate(calculateCurrentValue);
Asset.beforeUpdate(calculateCurrentValue);
export default Asset;



