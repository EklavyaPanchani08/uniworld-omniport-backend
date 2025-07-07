const express = require('express');
const placeOrder = require('../controllers/order.controller.js');

const router = express.Router();
router.post('/orders', placeOrder);

module.exports = router;
