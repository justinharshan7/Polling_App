const express = require('express');
const router = express.Router();
const { createPoll, getPoll, vote } = require('../controllers/pollController');
const validatePoll = require('../middleware/validatePoll');

router.post('/', validatePoll, createPoll);
router.get('/:id', getPoll);
router.post('/:id/vote', vote);

module.exports = router;