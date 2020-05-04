function adminMiddleware(req, res, next) {
    if (!req.session || !req.session.user.is_admin) {
        return res.redirect(
            '/admin/recipes?error=Somente administradores do sistema podem efetuar essa ação'
        );
    }

    return next();
}

module.exports = adminMiddleware;
