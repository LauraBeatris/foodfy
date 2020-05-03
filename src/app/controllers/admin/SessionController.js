const crypto = require('crypto');
const dateFns = require('date-fns');

const User = require('../../models/User');
const mail = require('../../../config/mail');

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
            const resetTokenExpires = dateFns
                .addHours(new Date(), 1)
                .toISOString();

            await User.update({
                id: req.user.id,
                userData: {
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

    resetPasswordForm(_, res) {
        return res.render('admin/sessions/resetPassword');
    }

    resetPassword() {}
}

module.exports = new SessionController();
