const validateRequestBody = (schema) => async (req, res, next) => {
    try {
        const striped = await schema.cast(req.body, { stripUnknown: true });
        await schema.validate(striped);
        req.body = striped;
        return next();
    } catch (error) {
        return res.status(400).json({ status: 400, statusText: "Bad request", errors: error.errors });
    }
}

const validateRequestParams = (schema) => async (req, res, next) => {

    try {
        const striped = await schema.cast(req.params, { stripUnknown: true });
        await schema.validate(striped);
        req.params = striped;
        return next();
    } catch (error) {
        return res.status(400).json({ status: 400, statusText: "Bad request", errors: error.errors });
    }
}

const validateRequestQuery = (schema) => async (req, res, next) => {
    try {
        const striped = await schema.cast(req.query, { stripUnknown: true });
        await schema.validate(striped);
        req.query = striped;
        return next();
    } catch (error) {
        return res.status(400).json({ status: 400, statusText: "Bad request", errors: error.errors });
    }
}

module.exports = { validateRequestBody, validateRequestParams, validateRequestQuery };
