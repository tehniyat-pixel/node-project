import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import AssetCategory from './category.model.js';

const AssetSubCategory = sequelize.define('AssetSubCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  subCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'asset_categories',
      key: 'id',
    },
  },
}, {
  tableName: 'asset_subcategories',
  timestamps: false,
});

AssetCategory.hasMany(AssetSubCategory, { foreignKey: 'categoryId' });
AssetSubCategory.belongsTo(AssetCategory, { foreignKey: 'categoryId' });

export default AssetSubCategory;
