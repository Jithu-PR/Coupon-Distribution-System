const express = require('express');
const { claimCoupon } = require('../controllers/couponController');

const router = express.Router();

router.post('/claim-coupon', claimCoupon);

module.exports = router;