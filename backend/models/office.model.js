import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Office = sequelize.define('Office', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  office_location: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'offices',
  timestamps: false,
});



export default Office;
