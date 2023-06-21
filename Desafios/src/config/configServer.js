const { connect } = require('mongoose');
require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  connectDb: () => {
    connect(process.env.MONGO_URL);
    console.log('Base de datos conectada');
  }
};

