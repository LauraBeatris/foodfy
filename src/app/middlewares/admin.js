function adminMiddleware(req, res, next) {
    if (!req.session || !req.session.user.is_admin) {
        return res.redirect(
            '/admin/recipes?error=Somente administradores do sistema possuem acesso à esse recurso'
        );
    }

    return next();
}

module.exports = adminMiddleware;
