const express = require('express');
const clientRoutes = require('./client');

const router = express.Router();

/**
 * GET status
 */
router.use('/clients', clientRoutes);
router.get('/status', (req, res) => res.json({status: 'OK'}));

// router.use('/clients', clientRoutes);

module.exports = router;