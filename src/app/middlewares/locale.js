function localeMiddleware(req, res, next) {
    const { lang } = req.query;

    if (lang) {
        res.cookie('foodfy:locale', lang, { maxAge: 900000, httpOnly: true });
    }

    return next();
}

module.exports = localeMiddleware;
