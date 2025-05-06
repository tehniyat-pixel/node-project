// backend/routes/assets.js
import express from 'express';
import Asset from '../models/Asset.js';

const router = express.Router();

// POST route to create a new asset
router.post('/', async (req, res) => {
  try {
    const { name, cost, purchaseDate, deliveryDate, depreciationValue } = req.body;
    const asset = await Asset.create({
      name,
      cost,
      purchaseDate,
      deliveryDate,
      depreciationValue,
    });
    res.status(201).json(asset);
  } catch (error) {
    console.error('Error creating asset:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET route to fetch all assets
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res.status(200).json(assets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET route to fetch a specific asset by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const asset = await Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(200).json(asset);
  } catch (error) {
    console.error('Error fetching asset:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT route to update an existing asset by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, cost, purchaseDate, deliveryDate, depreciationValue } = req.body;
  try {
    const asset = await Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    asset.name = name || asset.name;
    asset.cost = cost || asset.cost;
    asset.purchaseDate = purchaseDate || asset.purchaseDate;
    asset.deliveryDate = deliveryDate || asset.deliveryDate;
    asset.depreciationValue = depreciationValue || asset.depreciationValue;

    await asset.save();
    res.status(200).json(asset);
  } catch (error) {
    console.error('Error updating asset:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE route to delete an asset by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const asset = await Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    await asset.destroy();
    res.status(200).json({ message: 'Asset deleted successfully' });
  } catch (error) {
    console.error('Error deleting asset:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router; // Ensure default export
