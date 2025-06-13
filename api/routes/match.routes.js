const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.post('/', matchController.createMatch);
router.get('/:id', matchController.getMatch);
router.put('/:id', matchController.updateMatch);
router.delete('/:id', matchController.deleteMatch);


router.post('/checkMatch', matchController.checkMatch);
router.post('/checkMatch/ByCat/:id', matchController.checkMatchesByCat);
router.post('/checkMatch/ByOng/:id', matchController.checkMatchesByOng);
router.post('/checkMatch/ByAdopter/:id', matchController.checkMatchesByAdopter);
router.post('/checkMatchesScreen/:id', matchController.checkMatchesScreen);

module.exports = router;
