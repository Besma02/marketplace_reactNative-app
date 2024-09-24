// routes/productCategory.js

const express = require('express');
const router = express.Router();
const ProductCategory = require('../Model/productCategory');

// Create a new category
router.post('/categories', async (req, res) => {
  try {
    const { name } = req.body;

    // Vérification si la catégorie existe déjà
    const existingCategory = await ProductCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'La catégorie existe déjà' });
    }

    // Si elle n'existe pas, créer une nouvelle catégorie
    const category = new ProductCategory({ name });
    await category.save();

    res.status(201).json({ message: 'Catégorie créée avec succès', category });
  } catch (error) {
    if (error.code === 11000) {
      // Gestion de l'erreur d'unicité MongoDB
      return res.status(400).json({ message: 'Catégorie déjà existante' });
    }
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
});




// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await ProductCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
