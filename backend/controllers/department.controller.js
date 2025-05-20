import { Department } from '../models/index.js';

export const getDepartmentsByOffice = async (req, res) => {
  try {
    const { officeId } = req.query;

    if (!officeId) {
      return res.status(400).json({ message: 'Office ID is required' });
    }

    const departments = await Department.findAll({
      where: { officeId },
    });

    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create department' });
  }
};
