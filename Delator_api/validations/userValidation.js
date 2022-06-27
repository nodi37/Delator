const yup = require('yup');

const addUserSchema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(128).required(),
    phone_number: yup.number().positive().integer(),
    hourly_rate: yup.number().positive(),
    privlege_level: yup.number().positive().integer().min(0).max(3),
    photo: yup.string(),
});

module.exports = {addUserSchema};
