const bcrypt = require('bcrypt');
const User = require('../../models/User');
const mail = require('../../../config/mail');

/*
    This controller is responsable for the user operations related to
    the admin domain
*/
class UserController {
    async list(req, res) {
        const { error, success } = req.query;

        const users = await User.findAll({
            endOfQuery: 'ORDER BY created_at DESC',
        });

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
            const password = await bcrypt.hash('123', 8);

            const { name, email, is_admin } = req.body;
            await User.create({
                name,
                email,
                password,
                is_admin: !!is_admin,
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
        const { registedUser } = req;
        return res.render('admin/users/edit', {
            registedUser,
        });
    }

    async put(req, res) {
        const { id } = req.params;
        const { updatedData } = req;

        const registedUser = {
            id,
            ...req.body,
        };

        const updatedUser = {
            ...registedUser,
            ...updatedData,
        };

        try {
            await User.update({
                id,
                fieldsData: updatedData,
            });

            /* Updating logged user */
            if (Number(id) === req.session.user.id) {
                req.session.user = {
                    id: Number(id),
                    ...req.session.user,
                    ...updatedData,
                };

                req.session.save();
            }

            return res.render('admin/users/edit', {
                success: 'Usuário atualizado com sucesso',
                registedUser: updatedUser,
            });
        } catch (err) {
            return res.render('admin/users/edit', {
                error:
                    'Houve um erro na atualização do usuário. Por favor, tente novamente.',
                registedUser,
            });
        }
    }

    async delete(req, res) {
        try {
            await User.delete(req.params.id);

            if (req.params.id === req.session.user.id) {
                return res.redirect(
                    '/admin/login?success=Sua conta foi deletado com sucesso'
                );
            }

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
