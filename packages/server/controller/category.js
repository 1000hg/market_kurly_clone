const categoryViewModel = require('../services/category.js')

async function findCategoryList(req, res) {
    const result = await categoryViewModel.findCategoryList();
    res.status(200).json(result)
}

module.exports = {
    findCategoryList
};