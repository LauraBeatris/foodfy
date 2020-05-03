/*
    This controller is responsable for the user profile operations related to
    the admin domain
*/
class SessionController {
    loginForm(_, res) {
        return res.render('admin/sessions/login');
    }

    login(req, res) {
        try {
            req.session.user = req.user;

            return res.redirect(
                '/admin/profile?success=Usuário autenticado com sucesso'
            );
        } catch (err) {
            return res.render('admin/sessions/login', {
                error:
                    'Houve um erro na autenticação do usuário. Por favor, tente novamente.',
            });
        }
    }

    logout(req, res) {
        req.session.destroy();

        return res.redirect('/admin/login');
    }

    recoverPasswordForm(_, res) {
        return res.render('admin/sessions/recoverPassword');
    }

    recoverPassword() {}

    resetPasswordForm(_, res) {
        return res.render('admin/sessions/resetPassword');
    }

    resetPassword() {}
}

module.exports = new SessionController();
