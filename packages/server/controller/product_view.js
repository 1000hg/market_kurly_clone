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

async function findProductViewName(req, res) {
  console.log(req.query.product_name);
  const result = await productViewModel.findProductViewName(req.query.product_name);
  res.status(200).json(result)
}


async function findProductImg(req, res) {
  const result = await productViewModel.findProductImg();
  res.status(200).json(result)
}

async function findProductView(req, res) {
  req.params.user_seq = req.session.user.user_seq
  const result = await productViewModel.findProductView(req.params);
  res.status(200).json(result)
}


  module.exports = {
    createProductView,
    findProductViewList,
    findProductViewCategory,
    findProductViewName,
    findProductImg,
    findProductView
  }