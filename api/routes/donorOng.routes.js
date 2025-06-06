const express = require('express');
const router = express.Router();
const donorOngController = require('../controllers/donorOngController');

router.post('/', donorOngController.createDonorOng);
router.post('/login', donorOngController.loginDonorOng);
router.get('/:id', donorOngController.getDonorOng);
router.put('/:id', donorOngController.updateDonorOng);
router.delete('/:id', donorOngController.deleteDonorOng);

router.post('/catsWithInterest', donorOngController.CatsWithInterest);
router.post('/avaliableAdopters', donorOngController.AvaliableAdopters);
router.post('/evaluateAdopter', donorOngController.evaluateAdopter);
module.exports = router;
