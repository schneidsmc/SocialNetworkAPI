const { User, Thought } = require('../models');

module.exports = {
    // GET THOUGHT
    async getThought(req, res) {
        try{
            const thoughts = await Thought.find()
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
// GET SINGLE THOUGHT
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId})
        if (!thought) {
            return res.status(404).json({message: 'No Thought with that ID!'})
        }
        res.json(thought)
        }catch (err) {
            res.status(500).json(err)
        }
    },
// CREATE THOUGHT
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {thoughts: thought._id}},
                {runValidators: true, new: true}
            );

            if (!user) {
                return res.status(404).json({message: 'No User with this ID'})
            }
             res.json(user)
            } catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },
// DELETE THOUGHT
    async deleteThought(req, res) {
        try{
            const userId = req.params.userId;
            const thoughtId = req.params.thoughtId;



            const thought = await Thought.findByIdAndDelete(thoughtId);
            if (!thought) {
                return res.status(404).json({message: 'No Thought with this ID'})
            }
            const user = await User.findOneAndUpdate(
                userId,
                {$pull: {thoughts: thoughtId}},
                {new: true}
            )
            if (!user) {
                res.status(404).json({message: 'Thought deleted but no user found'})
            }
            res.json({message: 'Thought successfully deleted'})
        } catch (err) {
            res.status(500).json(err)
        }
    },
// CREATE REACTION
    async createReaction(req, res) {
        try{
            const thoughtId = req.params.thoughtId;
            const {reactionBody, username} = req.body;


            const thought = await Thought.findOneAndUpdate(
                {_id: thoughtId},
                {$addToSet: {reactions:{ reactionBody, username }}},
                {runValidators: true, new: true}
            );
        if (!thought) {
            return res.status(404).json({message: 'No thought found with this id'})
        }
        res.json(thought)

        }catch (err) {
            res.status(500).json(err)
        }
    },
// DELETE REACTION
    async deleteReaction(req, res) {
        try{
            const thoughtId = req.params.thoughtId;
            const reactionId = req.params.reactionId;

            const thought = await Thought.findOneAndUpdate(
                {_id: thoughtId},
                {$pull: {reactions: {reactionId: reactionId}}},
                {runValidators: true, new: true}
            );
            if(!thought){
                return res.status(404).json({message: 'No thought found with this id'})
            }
            res.json(thought)
        }catch (err) {
            res.status(500).json(err)
        }
    }
};
