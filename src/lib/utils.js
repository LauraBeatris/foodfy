module.exports = {
    formatFilePath: (req, path) =>
        `${req.protocol}://${req.headers.host}${path.replace('public', '')}`,
};
