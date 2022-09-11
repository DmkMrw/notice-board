const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if (NODE_ENV === 'production') dbUri = 'url to remote db';
else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/adsDBtest';
else dbUri = 'mongodb://localhost:27017/adsDB';

// connects our backend code with the database

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

if(process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
};
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  store: MongoStore.create({ mongoUrl: dbUri }),
  secret: 'xyz567',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV == 'production',
  },
}));


app.use('/api', adsRoutes);
app.use('/auth', authRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});

module.exports = server;