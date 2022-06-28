const validateRequestBody = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        return next();
    } catch (error) {
        return res.status(400).json({ status: 400, statusText: "Bad request", errors: error.errors });
    }
}

const validateRequestParams = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.params);
        return next();
    } catch (error) {
        return res.status(400).json({ status: 400, statusText: "Bad request", errors: error.errors });
    }
}

const validateRequestQuery = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.query);
        return next();
    } catch (error) {
        return res.status(400).json({ status: 400, statusText: "Bad request", errors: error.errors });
    }
}


module.exports = {validateRequestBody, validateRequestParams, validateRequestQuery};
