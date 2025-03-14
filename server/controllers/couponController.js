const { coupons } = require("../config");
const fs = require('fs');

let couponIndex = 0;
let claimedUsers = {};

const COOLDOWN_TIME = 3600000;

try {
  const data = fs.readFileSync('claimedUsers.json', 'utf8');
  claimedUsers = JSON.parse(data);
} catch (err) {
  console.log('No previous claim data found, starting fresh.');
}

const claimCoupon = (req, res) => {

    const userIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const claimTimestamp = new Date();
    const userCookie = req.cookies['couponClaim'];

    if (claimedUsers[userIp] && Date.now() - new Date(claimedUsers[userIp].timestamp).getTime() < COOLDOWN_TIME) {
        
    return res.status(403).json({
        message: 'You need to wait for 1 hr before claiming another coupon.'
      });
    }

    if (userCookie && Date.now() - new Date(userCookie.timestamp).getTime() < COOLDOWN_TIME) {
    return res.status(403).json({
        message: 'You need to wait for 1 hr before claiming another coupon.'
      });
    }

    const coupon = coupons[couponIndex];
    couponIndex = (couponIndex + 1) % coupons.length;

    claimedUsers[userIp] = { timestamp: claimTimestamp, coupon: coupon };
    fs.writeFileSync('claimedUsers.json', JSON.stringify(claimedUsers, null, 2));
    res.cookie('couponClaim', { timestamp: claimTimestamp }, { maxAge: COOLDOWN_TIME, httpOnly: true });

    return res.status(200).json({
        coupon: coupon,
        message: `Congratulations! You have claimed coupon: ${coupon}`
      });
}

module.exports = {claimCoupon};
