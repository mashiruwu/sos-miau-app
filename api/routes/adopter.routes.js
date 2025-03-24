const express = require('express');
const router = express.Router();
const adopterController = require('../controllers/adopterController');

router.post('/', adopterController.createAdopter);
router.get('/:id', adopterController.getAdopter);
router.put('/:id', adopterController.updateAdopter);
router.delete('/:id', adopterController.deleteAdopter);

module.exports = router;
