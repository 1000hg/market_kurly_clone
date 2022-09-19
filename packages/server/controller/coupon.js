const couponViewModel = require('../services/coupon.js')

async function findCouponList(req, res) {
    const result = await couponViewModel.findCouponList();
    res.status(200).json(result)
}

async function findUserCouponList(req, res) {
    const result = await couponViewModel.findUserCouponList(req.session.user.user_seq);
    res.status(200).json(result)
}

module.exports = {
    findCouponList
};