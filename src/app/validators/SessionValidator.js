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
            return res.render('admin/users', {
                error:
                    'Houve um erro na autenticação do usuário. Por favor, tente novamente.',
            });
        }
    }
}

module.exports = new SessionValidator();
