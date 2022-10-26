const noticeModel = require('../services/notice.js')

async function findNoticeList(req, res) {
    const result = await noticeModel.findNoticeList();
    res.status(200).json(result)
}

module.exports = {
    findNoticeList
}