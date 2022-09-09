const Ads = require('../models/ad.model');

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
  const { title, content, date, photo, price, location, info } = req.body;
    const newAds = new Ads({ title: title, content:content, date: date, photo: photo, price: price, location: location, info: info});
    await newAds.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }
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
  const { title, content, date, photo, price, location, info } = req.body;

  try {
    const ad = await Ads.findById(req.params.id);
    if(ad) {
      await Ads.updateOne({ _id: req.params.id }, { $set: { title: title, content: content, date: date, photo: photo, price: price, location: location, info: info }});
      res.json(ad);
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