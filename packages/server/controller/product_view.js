const productViewModel = require('../services/product_view.js')


async function createProductView(req, res) {
    if(!req.body)
        res.status(200).send({ status: 400, message: "data not found" });

    const result = await productViewModel.createProductView(req.body);
    res.status(200).json(result)
}

async function findProductViewList(req, res) {
  const result = await productViewModel.findProductViewList();
  res.status(200).json(result)
}

async function findProductViewCategory(req, res) {
  const result = await productViewModel.findProductViewCategory();
  res.status(200).json(result)
}

  module.exports = {
    createProductView,
    findProductViewList,
    findProductViewCategory
  }