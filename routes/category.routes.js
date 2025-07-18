const express = require('express');
const { getCategories } = require('../controllers/category.controller');

const router = express.Router();
router.get('/categories', getCategories);

module.exports = router;
