const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');


exports.register = async (req, res) => {
  try {

    const { login, password, phoneNumber } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (login && typeof login === 'string' && password && typeof password === 'string' && phoneNumber && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {

      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        fs.unlinkSync(req.file.path);
        return res.status(409).send({ message: 'User with this login already exists' });
      }
      const user = new User({login, password: await bcrypt.hash(password, 10), phoneNumber, avatar: req.file.filename});
      await user.save();
      res.status(201).json({ message: 'User created ' + user.login });
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (login && typeof login === 'string' && password && typeof password === 'string') {
      const user = await User.findOne({ login });

      if (!user) {
        res.status(400).send({ message: 'Login or password are incorrect' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.login = user.login;
          req.session.id = user._id;
          // req.session = { user };
          // req.session.save();
          res.status(200).json({ message: 'You are logged as ' + req.session.login  });
        }
        else {
        res.status(400).send({ message: 'Login or password are incorrect' });
        };
      };
    } else {
      res.status(400).send({ message: 'Bad request' });
    };
  } catch (err) {
    res.status(500).send({ message: err.message });
  };
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).send({ message: 'User logged out' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  };
};

exports.getUser = async (req, res) => {

// req.session.login checked in middleware

  res.send({ message: `Authorized as ${req.session.login}, id: ${req.session.id}` });
};

exports.getUserByLogin = async (req, res) => {

  try {
    const user = await User.findOne({ login: req.params.login });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};