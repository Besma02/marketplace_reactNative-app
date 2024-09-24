
const productCategory = require('../Model/productCategory')
const Product = require('../Model/productModel')
const mongoose = require('mongoose')
const path = require('path');

// get all workouts
const getProducts = async(req, res) => {
    try {
    const products = await Product.find({}).sort({createdAt: 1})

  res.status(200).json(products)
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  
}

// get a single workout
const getProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such product'})
  }

  const product = await Product.findById(id)

  if (!product) {
    return res.status(404).json({error: 'No such product'})
  }

  res.status(200).json(product)
}

// Configure multer for file uploads

const createProduct = async (req, res) => {
      
    try {
        // Find the category by name (or by some unique identifier like categoryId)
        const category = await productCategory.findOne({ name: req.body.categoryName });
        
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
    
        // Create a new product with the category ObjectId
        
        // const imagePath = req.file ? `/uploads/${req.file.filename}` : '';
        const imagePath = req.file ? path.join('uploads', req.file.filename) : '';
        // const imagefilename=req.params
        console.log(imagePath);
        const newProduct = new Product({
          name: req.body.name,
          price: req.body.price,
          desc: req.body.desc,
          isliked:req.body.isliked,
          quantity:req.body.quantity,
          category: category._id,  // Reference the ObjectId of the category

          image: imagePath
        });
    
        // Save the product
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

// delete a workout
const deleteProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such product'})
  }

  const product = await Product.findOneAndDelete({_id: id})

  if(!product) {
    return res.status(400).json({error: 'No such product'})
  }

  res.status(200).json(product)
}

// update a workout
const updateProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such product'})
  }

  const product = await Product.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!product) {
    return res.status(400).json({error: 'No such product'})
  }

  res.status(200).json(product)
}

module.exports = {
    getProducts, 
    getProduct, 
    createProduct, 
    deleteProduct, 
    updateProduct
}