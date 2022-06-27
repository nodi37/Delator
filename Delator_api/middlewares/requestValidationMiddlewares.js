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


//Dla jednego zrobić to tak:
module.exports = {validateRequestBody, validateRequestParams};
//Importować tak 
//const validateRequest = require('./api/middlewares/validationMiddleware');


//Dla wielu robić to tak: 
// module.exports.smth = () => {}
// module.exports.smth1 = () => {}
//ALBO 
// module.exports = {
//     GetAllUsers,
//     GetUser,
//     DeleteUser,
// };
//I importować tak: 
//const { GetAllUsers, GetUser, DeleteUser } = require("../controllers/User");


//Importować tak samo ale używać już
//validationMiddleware.smth1()