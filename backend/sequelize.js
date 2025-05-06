// sequelize.js

import { Sequelize, DataTypes } from 'sequelize';


const sequelize = new Sequelize('assetdb', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
});

const Asset = sequelize.define('Asset', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  purchaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  deliveryDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  depreciationValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});


export default sequelize;
