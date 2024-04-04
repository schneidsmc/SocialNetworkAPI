const router = require('express').Router();

const{
    getThought,
    getSingleThought,
    createThought,
    // updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtControl');

// GET ALL THOUGHTS, CREATE THOUGHT
router.route('/').get(getThought).post(createThought);

// GET SINGLE THOUGHT, DELETE SINGLE THOUGHT, UPDATE SINGLE THOUGHT
router.route('/:thoughtId')
.get(getSingleThought)
// .put(updateThought)
.delete(deleteThought);

// POST NEW REACTION
router.route('/:thoughtId/reactions')
.post(createReaction);

// DELETE REACTION
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;