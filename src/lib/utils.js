const { validationResult } = require('express-validator');

module.exports = {
    formatFilePath: (req, path) =>
        `${req.protocol}://${req.headers.host}${path.replace('public', '')}`,
    parseValidationErrors: (req) => {
        let validationErrors = validationResult(req);
        validationErrors = validationErrors.array();

        let fieldsErrorMessages = [];

        if (validationErrors.length > 0) {
            fieldsErrorMessages = validationErrors.reduce(
                (messages, error) => ({
                    ...messages,
                    [error.param]: error.msg,
                }),
                {}
            );
        }

        return fieldsErrorMessages;
    },
};
