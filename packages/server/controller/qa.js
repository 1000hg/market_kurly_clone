const qaModel = require('../services/qa.js')


async function createQa(req, res) {
    if(!req.body)
        res.status(200).send({ status: 400, message: "data not found" });

    const result = await qaModel.createReview(req.body);
    res.status(200).json(result)
}

async function findQa(req, res) {
    const result = await qaModel.findReview(req.body);
    res.status(200).json(result)
}

async function findQaList(req, res) {
    const result = await qaModel.findReviewList(req.body);
    res.status(200).json(result)
}

module.exports = {
    createQa,
    findQa,
    findQaList
}