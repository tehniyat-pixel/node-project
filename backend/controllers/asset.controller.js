import {
  Asset,
  AssetCategory,
  AssetSubCategory,
  Office,
  Department,
  Employee,
  Supplier
} from '../models/index.js';
export const getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
};

export const createAsset = async (req, res) => {
  try {
    const filePath = req.file ? req.file.path : null;
    const {
      assetCost,
      purchaseDate,
      deliveryDate,
      depreciationRate,
      appreciationRate,
      categoryId,
      subCategoryId,
      locationId,
      departmentId,
      employeeId,
      supplierId,
 
    } = req.body;

    // Validate foreign keys
    const [
      category,
      subcategory,
      location,
      department,
      employee,
      supplier
    ] = await Promise.all([
      AssetCategory.findByPk(categoryId),
      AssetSubCategory.findByPk(subCategoryId),
      Office.findByPk(locationId),
      Department.findByPk(departmentId),
      Employee.findByPk(employeeId),
      Supplier.findByPk(supplierId)
    ]);

    if (!category || !subcategory || !location || !department || !employee || !supplier) {
      return res.status(400).json({ message: 'Invalid foreign key reference' });
    }

    // Create and store only necessary fields
    const newAsset = await Asset.create({
       asset_cost: assetCost,
      purchase_date: purchaseDate,
      delivery_date: deliveryDate,
      depreciation_rate: depreciationRate,
      appreciation_rate: appreciationRate,
      categoryId,
      subCategoryId,
     officeId: locationId,
      departmentId,
      employeeId,
      supplierId,
      file_path: filePath, 
    });
    console.log(filePath);
    res.status(201).json(newAsset);
  } catch (error) {
    console.error('Error creating asset:', error);
    res.status(500).json({ message: 'Failed to create asset' });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Asset.destroy({ where: { asset_id: id } });
    if (deleted) {
      return res.status(200).json({ message: 'Asset deleted successfully' });
    }
    return res.status(404).json({ message: 'Asset not found' });
  } catch (error) {
    console.error('Delete asset error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};