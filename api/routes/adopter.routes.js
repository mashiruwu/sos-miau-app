const express = require('express');
const router = express.Router();
const adopterController = require('../controllers/adopterController');

router.post('/', adopterController.createAdopter);
router.post('/login', adopterController.loginAdopter);
router.get('/:id', adopterController.getAdopter);
router.put('/:id', adopterController.updateAdopter);
router.delete('/:id', adopterController.deleteAdopter);

router.get('/avaliableCats/:id', adopterController.avaliableCats)
router.post('/evaluateCat', adopterController.evaluateCat);

module.exports = router;
