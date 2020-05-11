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
    successMessage: (req, method, field) =>
        ` ${req.__(`toasts.success.${method}`)} ${req.__n(field, 1)}`,
    errorMessage: (req, method, field) =>
        ` ${req.__(`toasts.errors.${method}`)} ${req.__n(field, 1)}`,
};
