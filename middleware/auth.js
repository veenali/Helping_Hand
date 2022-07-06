module.exports.isAuthenticated = (req, res, next) => {
    if (req.cookies.email) {
        return next()
    }
    return res.redirect('/loginSignUp')
}

module.exports.isLoggedIn = (req, res, next) => {
    if (req.cookies.email) return res.redirect('/')
    return next()
}