function authMiddleware(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.redirect('/admin/login');
    }

    res.locals.user = req.session.user;
    return next();
}

module.exports = authMiddleware;
