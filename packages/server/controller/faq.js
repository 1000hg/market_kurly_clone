const faqModel = require('../services/faq.js')

async function findFaqTypeList(req, res) {
    const result = await faqModel.findFaqTypeList();
    res.status(200).json(result)
}

async function createFaq(req, res) {
    const result = await faqModel.createFaq(req.body);
    res.status(200).json(result)
}

async function findFaqList(req, res) {
    const result = await faqModel.findFaqList(req.query);
    res.status(200).json(result)
}


module.exports = {
    findFaqTypeList,
    createFaq,
    findFaqList
}