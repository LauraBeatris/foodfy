const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/uploads');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now();
            cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        const isAccepted = [
            'image/png',
            'image/jpg',
            'image/jpeg',
            'image/svg',
        ].find((format) => file.mimetype === format);

        if (isAccepted) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
});
