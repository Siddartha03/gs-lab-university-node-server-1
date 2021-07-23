const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

//Process
router.post('/register', userController.registerProcess);
router.post('/login', userController.loginProcess);
//Password change
router.post('/password-change', userController.changePassword)

module.exports = router;