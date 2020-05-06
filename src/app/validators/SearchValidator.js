class SearchValidator {
    index(req, res, next) {
        if (!req.query.filter) return res.redirect('/');

        return next();
    }
}

module.exports = new SearchValidator();
