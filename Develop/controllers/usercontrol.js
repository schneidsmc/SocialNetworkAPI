
const { User, Thought } = require('../models');

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
    try {
        const userId = req.params.userId;
        console.log('Deleting user with ID:', userId);

        // Find and remove the user by ID
        const user = await User.findOneAndDelete({ _id: userId });

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'No User Found with that ID!' });
        }

        // Delete all thoughts associated with the user
        const thoughts = await Thought.deleteMany({ _id: { $in: user.thoughts } });

        if (thoughts.deletedCount === 0) {
            console.log('No thoughts deleted for the user');
            return res.status(404).json({ message: 'No Thoughts Found for the User!' });
        }

        // User and thoughts deleted successfully
        console.log('User and thoughts deleted successfully');
        return res.json({ message: 'User and Thoughts Deleted' });
    } catch (err) {
        console.error('Error deleting user and thoughts:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
  
    }
},



// async deleteUser(req, res) {
    //     try{
    //         const user = await User.findOneAndRemove({_id: req.params.userId})

    //     if (!user) {
    //         return res.status(404).json({message: 'No User Found with that ID!'})
    //     }

    //     const thoughts = await Thought.deleteMany({_id: {$in: user.thoughts}})

    //     if(!thoughts.deletedCount === 0){
    //         return res.status(404).json({message: 'No Thought Found with that User ID!'})
    //     }
    //     res.json({message: 'User and Thoughts Deleted'})
    //     }catch (err) {
    //         res.status(500).json(err)
    //     }
    // },

 // ADD FRIEND
    async addFriend(req, res) {
        try{
            const {userId, friendId} =req.params;
            const user = await User.findOneAndUpdate(
                {_id: userId},
                {$addToSet: {friends: friendId}},
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
// async deleteFriend(req, res) {
//     try {
//         const userId = req.params.userId;
//         const friendId = req.params.friendId;

//         // Check if userId and friendId are valid ObjectIDs
//         if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(friendId)) {
//             return res.status(400).json({ message: 'Invalid ObjectID' });
//         }

//         const user = await User.findOneAndUpdate(
//             { _id: userId },
//             { $pull: { friends: friendId } },
//             { new: true }
//         );

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json({ message: 'Friend deleted successfully', user });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// }



