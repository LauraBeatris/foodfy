const User = require('../models/User');

class UserValidator {
    async post(req, res, next) {
        try {
            // Validate fields
            const { email } = req.body;

            // Verify if the already user exists
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
}

module.exports = new UserValidator();
