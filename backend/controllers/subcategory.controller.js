import { AssetSubCategory } from '../models/index.js';

// controllers/subcategoryController.js


export const getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({ message: 'Category ID is required' });
    }

    const subcategories = await AssetSubCategory.findAll({
      where: { categoryId },
    });

    res.json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createSubcategory = async (req, res) => {
  try {
    const subcategory = await AssetSubCategory.create(req.body);
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create subcategory' });
  }
};
