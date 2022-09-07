const reviewModel = require('../services/review.js')


async function createProduct(req, res) {
    if(!req.body)
        res.status(200).send({ status: 400, message: "data not found" });

    const result = await reviewModel.createReview(req.body);
    res.status(200).json(result)
}

async function findReview(req, res) {
    const result = await reviewModel.findReview(req.body);
    res.status(200).json(result)
}

async function findReviewList(req, res) {
    const result = await reviewModel.findReviewList(req.body);
    res.status(200).json(result)
}

module.exports = {
    createProduct,
    findReview,
    findReviewList
}