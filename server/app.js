require('dotenv').config()
const path = require('path');
const express = require('express')
const mongoose = require('mongoose')
const products = require('./routes/products')
// const productCategoryRoutes = require('./routes/categoryProduct')
// express app
const app = express()
const productCategoryRoutes = require('./routes/productCategory');

// middleware
app.use(express.json())
const cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
  app.use('/uploads', express.static('uploads'));
//  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



//  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//  app.get('/product-image/:filename', (req, res) => {
//    const { filename } = req.params;
//    const filePath = path.join(__dirname, 'uploads', filename);
 
//    res.sendFile(filePath, (err) => {
//      if (err) {
//        return res.status(404).send('Image not found');
//      }
//    });
//  });
app.use('/api', productCategoryRoutes);

// routes
app.use('/api/products', products)
// app.use('/api/', productCategoryRoutes)
// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 