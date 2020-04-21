const db = require('../../config/database');

class File {
    create(file) {
        const query = `
                INSERT INTO files (
                    name,
                    path
                ) VALUES (
                    $1,
                    $2
                ) RETURNING id
            `;

        return db.query(query, [file.originalname, file.path]);
    }
}

module.exports = new File();
