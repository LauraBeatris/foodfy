const crypto = require('crypto');
const User = require('../../models/User');
const mail = require('../../../config/mail');

/*
    This controller is responsable for the user operations related to
    the admin domain
*/
class UserController {
    async list(req, res) {
        const { error, success } = req.query;

        const usersResults = await User.all();
        const users = usersResults.rows;

        return res.render('admin/users/list', {
            users,
            error,
            success,
        });
    }

    create(_, res) {
        return res.render('admin/users/create');
    }

    async post(req, res) {
        try {
            const password = crypto.randomBytes(11).toString('hex');
            await User.create({
                ...req.body,
                password,
            });

            mail.sendMail({
                to: req.body.email,
                from: process.env.APP_MAIL,
                subject: 'Credenciais da sua conta - Bem vindo ao Foodfy',
                html: `
                    <h1> Bem vindo ao Foodfy! </h1>
                    <h3> Para acessar a plataforma, vá para a <a href="${req.protocol}://${req.headers.host}/admin/login">página de login</a> e insira a senha abaixo. <h2>
                    <p><strong>Senha: </strong>${password}</p>
                `,
            });

            return res.redirect(
                '/admin/users?success=Usuário criado com sucesso'
            );
        } catch (err) {
            return res.render('admin/users/create', {
                error:
                    'Houve um erro no cadastro do usuário. Por favor, tente novamente.',
            });
        }
    }

    edit(req, res) {
        return res.render('admin/users/edit', { user: req.user });
    }

    async put(req, res) {
        const { id } = req.params;

        try {
            await User.update({
                id,
                userData: {
                    name: req.body.name,
                    email: req.body.email,
                    is_admin: !!req.body.is_admin,
                },
            });

            return res.render('admin/users/edit', {
                success: 'Usuário atualizado com sucesso',
                user: { ...req.body, id },
            });
        } catch (err) {
            return res.render('admin/users/create', {
                error:
                    'Houve um erro na atualização do usuário. Por favor, tente novamente.',
                user: { ...req.body, id },
            });
        }
    }

    async delete(req, res) {
        try {
            await User.delete(req.params.id);

            return res.redirect(
                '/admin/users?success=Usuário deletado com sucesso'
            );
        } catch (err) {
            return res.render('admin/users/edit', {
                error:
                    'Houve um erro na deleção do usuário. Por favor, tente novamente.',
            });
        }
    }
}

module.exports = new UserController();
