const yup = require('yup');

module.exports.idParamSchema = yup.object({
    id: yup.number().positive().integer().required()
});