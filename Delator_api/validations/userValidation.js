const yup = require('yup');

module.exports.addUserSchema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string(),
    company_id: yup.number().positive().integer(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(128).required(),
    phone_number: yup.number().positive().integer(),
    hourly_rate: yup.number().positive(),
    privlege_level: yup.number().positive().integer().min(1).max(2).required(),
    photo: yup.string(),
});

module.exports.editUserSchema = yup.object({
    first_name: yup.string(),
    last_name: yup.string(),
    company_id: yup.number().positive().integer(),
    email: yup.string().email(),
    password: yup.string().min(8).max(128),
    phone_number: yup.number().positive().integer(),
    hourly_rate: yup.number().positive(),
    privlege_level: yup.number().positive().integer().min(1).max(2),
    photo: yup.string(),
});

module.exports.getManyUsersSchema = yup.object({
    skip: yup.number().positive().integer(),
    limit: yup.number().positive().integer(),
    keyword: yup.string(),
    sortBy: yup.string(),
    sortOrder: yup.string().matches('descending','SortOrder accepts only >descending< keyword, use it to reverse sorting')
});