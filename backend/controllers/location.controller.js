import { Office } from '../models/index.js';

export const getAllLocations = async (req, res) => {
  try {
    const locations = await Office.findAll();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
};

export const createLocation = async (req, res) => {
  try {
    const location = await Office.create(req.body);
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create location' });
  }
};
