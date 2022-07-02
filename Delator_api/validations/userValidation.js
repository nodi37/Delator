const yup = require('yup');

module.exports.addUserSchema = yup.object({
    name: yup.string().required(),
    lastName: yup.string(),
    employeeOf: yup.array().of(yup.number()),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(128).required(),
    phoneNmber: yup.number().positive().integer(),
    privligeLvl: yup.number().positive().integer().min(1).max(2).required(),
    photo: yup.string(),
});

module.exports.editUserSchema = yup.object({
    name: yup.string(),
    lastName: yup.string(),
    employeeOf: yup.array().of(yup.number()),
    email: yup.string().email(),
    password: yup.string().min(8).max(128),
    phoneNmber: yup.number().positive().integer(),
    privligeLvl: yup.number().positive().integer().min(1).max(2),
    photo: yup.string(),
});

module.exports.getManyUsersSchema = yup.object({
    skip: yup.number().positive().integer(),
    limit: yup.number().positive().integer(),
    //employeeOf: yup.array().of(yup.number()),
    keyword: yup.string(),
    sortBy: yup.string(),
    sortOrder: yup.string().matches('descending','SortOrder accepts only >descending< keyword, use it to reverse sorting')
});