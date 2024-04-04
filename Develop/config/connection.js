const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/networkAPI'

connect(connectionString, {
    autoCreate: true,
})

connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
  
  connection.once('open', () => {
    console.log('Connected to MongoDB');
  });

module.exports = connection