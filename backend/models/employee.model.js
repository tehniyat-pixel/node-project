import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import Department from './department.model.js';

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  emp_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emp_designation:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'departments',
      key: 'id',
    },
  },
}, {
  tableName: 'employees',
  timestamps: false,
});

Department.hasMany(Employee, { foreignKey: 'departmentId' });
Employee.belongsTo(Department, { foreignKey: 'departmentId' });

export default Employee;
