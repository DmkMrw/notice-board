const express = require('express');
const router = express.Router();
const imageUpload = require('../utils/imageUpload');

const AdsController = require('../controllers/ads.controller');


router.get('/ads', AdsController.getAll);
router.get('/ads/:id', AdsController.getById);
router.post('/ads', imageUpload.single('image'), AdsController.postAds);
router.delete('/ads/:id', AdsController.deleteAds);
router.put('/ads/:id',imageUpload.single('image'), AdsController.putAds);
router.get('/ads/search/:searchPhrase', AdsController.getAdsBySearchPhrase);

module.exports = router;