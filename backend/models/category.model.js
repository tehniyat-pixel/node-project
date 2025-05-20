import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const AssetCategory = sequelize.define('AssetCategory', {
 id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'asset_categories',
  timestamps: false,
});

export default AssetCategory;
