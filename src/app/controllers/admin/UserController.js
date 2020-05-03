const User = require('../../models/User');

/*
    This controller is responsable for the user operations related to
    the admin domain
*/
class UserController {
    list(_, res) {
        return res.render('admin/users/list');
    }

    create(_, res) {
        return res.render('admin/users/create');
    }

    async post(req, res) {
        try {
            await User.create(req.body);

            return res.render('admin/users/create', {
                success: 'Usuário criado com sucesso',
            });
        } catch (err) {
            console.log(err);
            return res.render('admin/users/create', {
                error:
                    'Houve um erro no cadastro do usuário. Por favor, tente novamente.',
            });
        }
    }

    edit(_, res) {
        return res.render('admin/users/edit');
    }

    put() {}

    delete() {}
}

module.exports = new UserController();
