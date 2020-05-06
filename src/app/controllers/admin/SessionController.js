const crypto = require('crypto');

const User = require('../../models/User');
const mail = require('../../../config/mail');

/*
    This controller is responsable for the user profile operations related to
    the admin domain
*/
class SessionController {
    loginForm(req, res) {
        const { success } = req.query;
        return res.render('admin/sessions/login', { success });
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

    recoverPasswordForm(req, res) {
        const { success, error } = req.query;

        return res.render('admin/sessions/recoverPassword', {
            success,
            error,
        });
    }

    async recoverPassword(req, res) {
        const { email } = req.user;

        try {
            const resetToken = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            const resetTokenExpires = now.setHours(now.getHours() + 1);

            await User.update({
                id: req.user.id,
                fieldsData: {
                    reset_token: resetToken,
                    reset_token_expires: resetTokenExpires,
                },
            });

            mail.sendMail({
                to: email,
                from: process.env.APP_MAIL,
                subject: 'Recuperação de senha - Foodfy',
                html: `
                    <h1> Olá ${req.user.name} </h1>
                    <h3> <a href="${req.protocol}://${req.headers.host}/admin/reset-password?token=${resetToken}">Clique aqui<a/> para criar uma nova senha<h2>
                `,
            });

            return res.render('admin/sessions/recoverPassword', {
                success: 'Email de recuperação de senha enviado com sucesso',
            });
        } catch (err) {
            return res.render('admin/sessions/recoverPassword', {
                error:
                    'Houve um erro ao enviar o email de recuperação de senha. Por favor, tente novamente.',
                email,
            });
        }
    }

    resetPasswordForm(req, res) {
        const { token } = req.query;
        return res.render('admin/sessions/resetPassword', { token });
    }

    async resetPassword(req, res) {
        try {
            const { newPassword } = req.body;

            await User.update({
                id: req.user.id,
                fieldsData: {
                    password: newPassword,
                    reset_token: '',
                    reset_token_expires: '',
                },
            });

            return res.redirect(
                '/admin/login?success=Senha atualizada com sucesso'
            );
        } catch (err) {
            return res.render('admin/sessions/resetPassword', {
                error:
                    'Houve um erro ao enviar criar uma nova senha. Por favor, tente novamente.',
            });
        }
    }
}

module.exports = new SessionController();
