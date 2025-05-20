import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import Office from './office.model.js';

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dept_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  officeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'offices',
      key: 'id',
    },
  },
  
}, {
  tableName: 'departments',
  timestamps: false,
});

Office.hasMany(Department, { foreignKey: 'officeId' });
Department.belongsTo(Office, { foreignKey: 'officeId' });

export default Department;
