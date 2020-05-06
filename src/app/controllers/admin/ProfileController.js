const User = require('../../models/User');

/*
    This controller is responsable for the user profile operations related to
    the admin domain
*/
class ProfileController {
    async index(req, res) {
        const { success, error } = req.query;

        return res.render('admin/profile/index', {
            success,
            error,
        });
    }

    async put(req, res) {
        const { id } = req.session.user;

        const updatedUserData = {
            id,
            ...req.body,
        };

        try {
            await User.update({
                id,
                fieldsData: updatedUserData,
            });

            req.session.user = updatedUserData;
            req.session.save();

            return res.render('admin/profile/index', {
                success: 'Conta atualizada com sucesso',
                user: updatedUserData,
            });
        } catch (err) {
            return res.render('admin/profile/index', {
                error:
                    'Houve um erro na edição da sua conta. Por favor, tente novamente.',
                user: updatedUserData,
            });
        }
    }
}

module.exports = new ProfileController();
