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

    post() {}

    edit(_, res) {
        return res.render('admin/users/edit');
    }

    put() {}

    delete() {}
}

module.exports = new UserController();
