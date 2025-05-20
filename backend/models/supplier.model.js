import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import AssetCategory from './category.model.js';
const Supplier = sequelize.define('Supplier', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  supplier_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories', // <- Make sure this matches your actual table name
      key: 'id',
    },
  },
}, {
  tableName: 'suppliers',
  timestamps: false,
});

// In Supplier model
Supplier.belongsTo(AssetCategory, { foreignKey: 'categoryId' });
AssetCategory.hasMany(Supplier, { foreignKey: 'categoryId' });


export default Supplier;
