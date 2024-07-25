const User = require('../models/user')

module.exports.renderRegister =  (req, res) => {
    res.render('user/register')
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, function (err) {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Welcome to yelpCamp')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.renderLogin =  (req, res) => {
    res.render('user/login')
}

module.exports.login = async (req, res) => {
    req.flash('success', `Welcome Back, ${req.body.username} `)
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo
    if (redirectUrl.endsWith('/reviews'))
        return res.redirect(redirectUrl.slice(0,-8))
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    })
}