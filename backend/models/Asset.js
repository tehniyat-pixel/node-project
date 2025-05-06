// models/Asset.js
import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Asset = sequelize.define('asset', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  purchaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  deliveryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  depreciationValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: false,  // Disable automatic timestamps
});

export default Asset; // <-- THIS IS IMPORTANT
