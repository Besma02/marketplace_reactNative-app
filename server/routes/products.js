const express = require('express')
const {
  getProducts, 
  getProduct, 
  createProduct, 
  deleteProduct, 
  updateProduct
} = require('../controllers/productsControllers')
const multer = require('multer');
const path = require('path');
const router = express.Router()

router.get('/', getProducts)

router.get('/:id', getProduct)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');  // Save images in 'uploads' folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));  // Ensure unique filenames
    }
  });
  
  const upload = multer({
    storage: storage,
     limits: { fileSize: 1024 * 1024 * 5 },  // Limit files to 5MB
  });
router.post('/',upload.single('image'), createProduct)

router.delete('/:id', deleteProduct)

router.put('/:id', updateProduct)

module.exports = router