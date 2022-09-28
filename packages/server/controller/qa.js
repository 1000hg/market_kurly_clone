const qaModel = require('../services/qa.js')


async function createQa(req, res) {
    if(!req.body)
        res.status(200).send({ status: 400, message: "data not found" });

    const result = await qaModel.createQa(req.body);
    res.status(200).json(result)
}

async function findQa(req, res) {
    const result = await qaModel.findQa(req.body);
    res.status(200).json(result)
}

async function findQaList(req, res) {
    let page = 1
    
    if (req.query.page && req.query.page > 1)
        page = req.query.page

    const result = await qaModel.findQaList(page);
    res.status(200).json(result)
}

module.exports = {
    createQa,
    findQa,
    findQaList
}