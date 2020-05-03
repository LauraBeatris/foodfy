/*
    This controller is responsable for the user profile operations related to
    the admin domain
*/
class ProfileController {
    index(_, res) {
        return res.render('admin/profile/index');
    }

    put() {}
}

module.exports = new ProfileController();
