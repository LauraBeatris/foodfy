function guestMiddleware(req, res, next) {
    if (req.session.user) {
        return res.redirect(
            '/admin/recipes?error=Você já está logado. Saia de sua conta para acessar essa página.'
        );
    }

    return next();
}

module.exports = guestMiddleware;
