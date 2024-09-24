const mongoose = require('mongoose')
const ProductCategory = require('../Model/productCategory')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type:String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  image:{
   
    type:String,
    
  },
  isliked:{
    type:Boolean,
    required:true
  }
  
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)