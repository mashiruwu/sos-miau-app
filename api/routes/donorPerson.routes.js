const express = require('express');
const router = express.Router();
const donorPersonController = require('../controllers/donorPersonController');

router.post('/', donorPersonController.createDonorPerson);
router.get('/:id', donorPersonController.getDonorPerson);
router.put('/:id', donorPersonController.updateDonorPerson);
router.delete('/:id', donorPersonController.deleteDonorPerson);

module.exports = router;
