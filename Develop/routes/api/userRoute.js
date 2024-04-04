// getUsers
// getSingleUser
// createUser
// deleteUser
// addFriend
// deleteFriend

const router = require('express').Router();
const{
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/usercontrol');

// GET ALL USERS and CREATE USER
router.route('/')
.get(getUsers)
.post(createUser);

// GET SINGLE USER and DELETE USER
router.route('/:userId')
.get(getSingleUser)
.delete(deleteUser);

// CREATE FRIEND AND DELETE FRIEND
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;



