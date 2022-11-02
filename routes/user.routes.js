const express = require('express');
const router = express.Router()

const userController = require('../controllers/user.controller');
const { authorization } = require('../middleware/authorization');
const verifyToken = require('../middleware/verifyToken');

router.route('/')
    .get(userController.getUsers)

router.patch('/:id', verifyToken, authorization("candidate", 'hr'), userController.updateUser)


router.post('/signUp', userController.signUp)
router.post('/login', userController.loginUser)

router.get('/getMe', verifyToken, userController.getCurrentUser)

module.exports = router;