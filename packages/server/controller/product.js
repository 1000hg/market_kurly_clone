const productModel = require('../services/product.js')
const serviceStatus = require('../modules/serviceStatus')


async function createProduct(req, res) {
    if(!req.body)
        res.status(200).send({ status: 400, message: "data not found" });

    const result = await productModel.createProduct(req.body);
    res.status(200).json(result)
}

  module.exports = {
    createProduct
  }