const reviewModel = require('../services/review.js')


async function createReview(req, res) {
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
    let page = 1
    
    if (req.query.page && req.query.page > 1)
        page = req.query.page
    const result = await reviewModel.findReviewList(page);
    res.status(200).json(result)
}

module.exports = {
    createReview,
    findReview,
    findReviewList
}