

const mongoose = require('mongoose');

const ProductCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,  // L'unicité est appliquée ici sur le champ 'name'
  },
 

},{timestamps:true});

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);
