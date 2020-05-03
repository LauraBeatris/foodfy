const User = require('../models/User');

class SessionValidator {
    async login(req, res, next) {
        try {
            const verifyIfUserExistsResults = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });
            const verifyIfUserExists = verifyIfUserExistsResults.rows[0];

            if (!verifyIfUserExists) {
                return res.render('admin/sessions/login', {
                    error:
                        'Usuário não encontrado. Tem certeza que digitou as credenciais corretas?',
                });
            }

            const passwordMismatch =
                verifyIfUserExists.password !== req.body.password;
            if (passwordMismatch) {
                return res.render('admin/sessions/login', {
                    error: 'Senha inválida',
                });
            }

            req.user = verifyIfUserExists;

            return next();
        } catch (err) {
            return res.render('admin/sessions/login', {
                error:
                    'Houve um erro na autenticação do usuário. Por favor, tente novamente.',
            });
        }
    }

    async recoverPassword(req, res, next) {
        const { email } = req.body;

        try {
            const verifyIfUserExistsResults = await User.findOne({
                where: {
                    email,
                },
            });
            const verifyIfUserExists = verifyIfUserExistsResults.rows[0];

            if (!verifyIfUserExists) {
                return res.render('admin/sessions/recoverPassword', {
                    error:
                        'Usuário não encontrado. Tem certeza que digitou o email correto?',
                    email,
                });
            }

            req.user = verifyIfUserExists;

            return next();
        } catch (err) {
            return res.render('admin/sessions/recoverPassword', {
                error:
                    'Houve um erro ao enviar o email de recuperação de senha. Por favor, tente novamente.',
                email,
            });
        }
    }
}

module.exports = new SessionValidator();
