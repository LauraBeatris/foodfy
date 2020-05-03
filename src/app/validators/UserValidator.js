const User = require('../models/User');

class UserValidator {
    async post(req, res, next) {
        try {
            const { email } = req.body;

            const findUserByEmailResults = await User.findOne({
                where: { email },
            });
            const findUserByEmail = findUserByEmailResults.rows[0];

            if (findUserByEmail) {
                return res.render('admin/users/create', {
                    error: 'Esse usuário já está cadastrado no sistema',
                });
            }

            return next();
        } catch (err) {
            return res.render('admin/users/create', {
                error:
                    'Houve um erro no cadastro do usuário. Por favor, tente novamente.',
            });
        }
    }

    async edit(req, res, next) {
        try {
            const verifyIfUserExistsResults = await User.findOne({
                where: { id: req.params.id || req.body.id },
            });
            const verifyIfUserExists = verifyIfUserExistsResults.rows[0];

            if (!verifyIfUserExists) {
                return res.redirect(
                    '/admin/users?error=Usuário não encontrado'
                );
            }

            req.user = verifyIfUserExists;

            return next();
        } catch (err) {
            return res.render('admin/users', {
                error:
                    'Houve um erro na procura do usuário. Por favor, tente novamente.',
            });
        }
    }

    async put(req, res, next) {
        const { id } = req.params;

        try {
            const { email, currentEmail } = req.body;

            if (email !== currentEmail) {
                const findUserByEmailResults = await User.findOne({
                    where: { email },
                });
                const findUserByEmail = findUserByEmailResults.rows[0];

                if (findUserByEmail) {
                    return res.render('admin/users/edit', {
                        error: 'Esse usuário já está cadastrado no sistema',
                        user: { ...req.body, id },
                    });
                }
            }

            return next();
        } catch (err) {
            return res.render('admin/users/create', {
                error:
                    'Houve um erro na atualização do usuário. Por favor, tente novamente.',
                user: { ...req.body, id },
            });
        }
    }
}

module.exports = new UserValidator();
