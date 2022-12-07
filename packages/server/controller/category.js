const categoryViewModel = require('../services/category.js')

async function findCategoryList(req, res) {
    const result = await categoryViewModel.findCategoryList(req.query);
    res.status(200).json(result)
}

async function findCategoryChildData(req, res) {
    const result = await categoryViewModel.findCategoryChildData(req.query);
    res.status(200).json(result)
}

module.exports = {
    findCategoryList,
    findCategoryChildData
};