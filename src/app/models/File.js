const Base = require('./Base');

class File extends Base {
    constructor() {
        super('files');
    }
}

module.exports = new File();
