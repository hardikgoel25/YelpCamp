const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const { storeReturnTo } = require('../middleware');
const user = require('../controllers/users')

router.get('/register', user.renderRegister)
router.post('/register', catchAsync(user.register))

router.get('/login', user.renderLogin)
router.post('/login',storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), catchAsync(user.login))

router.get('/logout', user.logout);

module.exports = router