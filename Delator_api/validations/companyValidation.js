const yup = require('yup');

module.exports.addCompanySchema = yup.object({
    company_name: yup.string().required(),
    admin_id: yup.number().positive().integer(),
    pricing_plan: yup.number().positive().integer().min(0).max(1).required(),
    logo: yup.string(),
});

module.exports.editCompanySchema = yup.object({
    company_name: yup.string(),
    admin_id: yup.number().positive().integer(),
    pricing_plan: yup.number().positive().integer().min(0).max(1),
    logo: yup.string()
});

module.exports.idParamSchema = yup.object({
    id: yup.number().positive().integer().required()
});