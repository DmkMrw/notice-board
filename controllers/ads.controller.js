const Ads = require('../models/ad.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.getAll = async (req, res) => {
  try {
    res.json(await Ads.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {

  try {
    const ad = await Ads.findById(req.params.id);
    if(!ad) res.status(404).json({ message: 'Not found' });
    else res.json(ad);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postAds = async (req, res) => {

  try {
    const { title, description, date, price, location, user, phone} = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (title && description && date && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) && price && location && user) {
      const newAds = new Ads({ title, description, date, image: req.file.filename, price, location, user, phone});
      await newAds.save();
      res.json({ message: 'OK' });
    } else {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(400).send({ message: 'Bad request' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  };
};

exports.deleteAds = async (req, res) => {

  try {
    const ad = await Ads.findById(req.params.id);
    if(ad) {
      await Ads.deleteOne({ _id: req.params.id });
      res.json(ad);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putAds = async (req, res) => {
  const { title, description, date, price, location, user, phone } = req.body;
  console.log('body', req.body);
  try {
    const ad = await Ads.findById(req.params.id);
    if(ad) {
      ad.title = title;
      ad.description = description;
      ad.price = price;
      ad.date = date;
      ad.location = location;
      ad.user = user;
      ad.phone = phone;
      if (req.file) {
        ad.image = req.file.filename;
      }
      const updatedAd = await ad.save();
      res.json(updatedAd);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getAdsBySearchPhrase = async (req, res) => {

  try {
    const ad = await Ads.find({ $text: { $search: req.params.searchPhrase } });
    if(!ad) res.status(404).json({ message: 'Not found' });
    else res.json(ad);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

// exports.getAdsBySearchPhrase = async (req, res, next) => {
//   const { searchPhrase } = req.params;
//   try {
//     const ad = await Ads.find({ $text: { $search: searchPhrase } });
//     if (!ad) return res.status(404).json({ message: 'Ad not found' });
//     else res.json(ad);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };