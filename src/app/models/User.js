const Base = require('./Base');

class User extends Base {
    constructor() {
        super('users');
    }
}

module.exports = new User();
