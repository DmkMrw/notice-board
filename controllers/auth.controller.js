const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {

    const { login, password, phoneNumber } = req.body;

    if (login && typeof login === 'string' && password && typeof password === 'string' && phoneNumber && typeof phoneNumber === 'number') {

      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        return res.status(409).send({ message: 'User with this login already exists' });
      }
      const user = new User({login, password: await bcrypt.hash(password, 10)}, phoneNumber);
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
          res.status(200).send({ message: 'Login successful' });
          req.session.login = user.login;
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

// exports.user = async (req, res) => {
//   if (req.session.login) {
//     res.send({ login: req.session.login })

//   } else {
//     res.status(401).send({message: 'You are not authorized'})
//   }
// }