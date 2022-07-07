module.exports.emptyFieldsFilter = function (req, res, next) {
    const filteredBody = Object.fromEntries(Object.entries(req.body).filter(([_, v]) => !!v));
    const filteredQuery = Object.fromEntries(Object.entries(req.query).filter(([_, v]) => !!v));
    const filteredParams = Object.fromEntries(Object.entries(req.params).filter(([_, v]) => !!v));

    req.body = filteredBody;
    req.query = filteredQuery;
    req.params = filteredParams;

    return next();
}

