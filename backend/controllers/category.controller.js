import { AssetCategory } from '../models/index.js';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await AssetCategory.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories', error });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await AssetCategory.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};
