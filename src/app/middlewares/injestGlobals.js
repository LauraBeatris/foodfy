module.exports = (req, res, next) => {
    const engine = res.app.get('engine');
    engine.addGlobal('request', req);

    next();
};
