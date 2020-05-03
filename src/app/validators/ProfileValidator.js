const User = require('../models/User');

class ProfileValidator {
    async put(req, res, next) {
        const { id, email: currentEmail, password } = req.session.user;
        const { email, password: confirmPassword } = req.body;

        try {
            if (email !== currentEmail) {
                const findUserByEmailResults = await User.findOne({
                    where: { email },
                });
                const findUserByEmail = findUserByEmailResults.rows[0];

                if (findUserByEmail) {
                    return res.render('admin/profile/index', {
                        error:
                            'Esse email já está sendo utilizado por outro usuário',
                        user: { ...req.session.user, id },
                    });
                }
            }

            const passwordMismatch = confirmPassword !== password;
            if (passwordMismatch || !confirmPassword) {
                return res.render('admin/profile/index', {
                    error: 'Senha inválida',
                    user: { ...req.session.user, id },
                });
            }

            return next();
        } catch (err) {
            return res.render('admin/users', {
                error:
                    'Houve um erro na edição da sua conta. Por favor, tente novamente.',
            });
        }
    }
}

module.exports = new ProfileValidator();
