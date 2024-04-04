const router = require('express').Router();
const apiRoutes = require('./api')

router.use('/api', apiRoutes);

router.use((req, res)=> res.send('Wrong Route!'));

module.exports = router;

// const express = require('express');
// const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('HELLOOOOO')
// });

// module.exports = router;