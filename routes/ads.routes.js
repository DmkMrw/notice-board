const express = require('express');
const router = express.Router();

const AdsController = require('../controllers/ads.controller');


router.get('/ads', AdsController.getAll);
router.get('/ads/:id', AdsController.getById);
router.post('/ads', AdsController.postAds);
router.delete('/ads/:id', AdsController.deleteAds);
router.put('/ads/:id', AdsController.putAds);
router.get('/ads/search/:searchPhrase', AdsController.getAdsBySearchPhrase);

module.exports = router;