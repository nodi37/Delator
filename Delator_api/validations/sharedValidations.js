const yup = require('yup');

module.exports.idParamSchema = yup.object({
    id: yup.string().min(24).max(24).required()
});