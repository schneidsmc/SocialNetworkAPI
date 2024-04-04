
// addFriend
// deleteFriend

const { User, Thought, Model } = require('../models');

module.exports = {

// GET ALL USERS
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users);
        if (!users) {
            return res.status(404).json({message: 'No Users Found!'})
        }
        }catch (err) {
            res.status(500).json(err)
        }
    },

// GET ONE USER
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            
        if (!user) {
            return res.status(404).json({message: 'No User Found with that ID!'})
        }
        res.json(user);
        }catch (err) {
            res.status(500).json(err)
        }
    },

// CREATE USER
    async createUser(req, res) {
        try{
            const user = await User.create(req.body)

        if (!user) {
            return res.status(404).json({message: 'User not created!'})
        }
        res.json(user)
        }catch (err) {
            res.status(500).json(err)
        }
    },

// DELETE USER **Bonus for all the deleted user's thought to be deleted**
    async deleteUser(req, res) {
        try{
            const user = await User.findOneAndRemove({_id: req.params.userId})

        if (!user) {
            return res.status(404).json({message: 'No User Found with that ID!'})
        }

        // const thoughts = await Thought.deleteMany({_id: {$in: user.thoughts}})

        // if(!thoughts){
        //     return res.status(404).json({message: 'No Thought Found with that User ID!'})
        // }
        res.json({message: 'User and Thoughts Deleted'})
        }catch (err) {
            res.status(500).json(err)
        }
    },

 // ADD FRIEND
    async addFriend(req, res) {
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.params.friendId}},
                {runValidators: true, new: true}
            );

        if (!user) {
            return res.status(404).json({message: 'No User Found with that ID!'})
        }
        res.json(user)
        }catch (err) {
            res.status(500).json(err)
        }
    },

// DELETE FRIEND
    async deleteFriend(req, res) {
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                {new: true}
            );

        if (!user) {
            return res.status(404).json({message: 'No Friend Found with that ID!'})
        }
        res.json(user)
        }catch (err) {
            res.status(500).json(err)
        }
    }
}
