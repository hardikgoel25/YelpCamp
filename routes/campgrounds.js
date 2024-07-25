const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const campground = require('../controllers/campground')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')

router.get('/', catchAsync(campground.index))

router.get('/new', isLoggedIn, campground.renderNewForm)

router.post('/', isLoggedIn, upload.array('image'), validateCampground, catchAsync(campground.createCampground))

router.get('/:id', catchAsync(campground.renderShow))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campground.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campground.update))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campground.delete))

module.exports = router