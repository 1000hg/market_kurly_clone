const productModel = require('../services/product.js')
const serviceStatus = require('../modules/serviceStatus')



async function createProduct(req, res) {
    if(!req.body)
        res.status(200).send({ status: 400, message: "data not found" });

    const result = await productModel.createProduct(req.body);
    res.status(200).json(result)
}

async function createProductList(req, res) {
  const result = await productModel.createProductList(req.body);
  res.status(200).json(result)
}

async function getProductBrand(req, res) {
  const result = await productModel.getProductBrand(req.query);
  res.status(200).json(result)
}

async function getProductCategory(req, res) {
  const result = await productModel.getProductCategory();
  res.status(200).json(result)
}



module.exports = {
  createProduct,
  createProductList,
  getProductBrand,
  getProductCategory
}