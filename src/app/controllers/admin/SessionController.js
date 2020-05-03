/*
    This controller is responsable for the user profile operations related to
    the admin domain
*/
class SessionController {
    loginForm(req, res) {
        return res.render('admin/sessions/login');
    }

    login() {}

    logout() {}

    recoverPasswordForm(req, res) {
        return res.render('admin/sessions/recoverPassword');
    }

    recoverPassword() {}

    resetPasswordForm(req, res) {
        return res.render('admin/sessions/resetPassword');
    }

    resetPassword() {}
}

module.exports = new SessionController();
