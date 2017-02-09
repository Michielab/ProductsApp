var express = require('express');
var router = express.Router();
const Product = require('../models/product');

// list all products
router.get('/', (req, res, next) => {
  Product.find({}, (error, products)=>{
    if (error) {
      next(error);
    } else {
      res.render('products/index', { products } );
    }
  })
})


router.post('/', (req, res, next)=>{
  let product = {
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description
  };
  Product.create(product, (err, doc)=>{
    if (err) {
      next(err);
    } else {
      res.redirect('/products');
    }
  })
})

// show form to add new product
router.get('/new', (req, res) => {
  res.render('products/new')
})

router.get('/:id/edit', (req, res, next) => {
  Product.findById(req.params.id, (err, product)=>{
    if (err) {
      next(err)
    } else {
        res.render('products/edit', { product: product })
    }
  })
});

router.post('/:id/update', (req, res, next) => {
  let productToUpdate = {
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  }
  Product.findByIdAndUpdate(req.params.id, productToUpdate, (err, product)=>{
    if (err) {
      next(err)
    } else {
      res.redirect('/products');
    }
  })
});

router.get('/:id/delete', (req, res, next) => {
  Product.findByIdAndRemove(req.params.id, (err, product)=>{
    if (err) {
      next(err)
    } else {
      res.redirect('/products')
    }
  })
});


router.get('/:productId', (req, res, next)=> {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) {
      next(err);
    } else {
      res.render('products/show', product );
    }
  });
})




module.exports = router;
