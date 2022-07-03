const yup = require('yup');

//partial
const hourObj = yup.object({
    from: yup.date().required(),
    to: yup.date().required(),
});

const otherObj = yup.object({
    value: yup.number().required(), 
    name: yup.string().required(),
    description: yup.string(),
    photo: yup.string()
});

module.exports.addRaportSchema = yup.object({
    userId: yup.string().min(24).max(24).required(),
    companyId: yup.string().min(24).max(24).required(),
    hours: yup.array().of(hourObj),
    additional: yup.array().of(otherObj),
    hoursCount: yup.number(),
    hourWage: yup.number(),
    additionalValue: yup.number(),
    totalToPay: yup.number()
});

module.exports.editRaportSchema = yup.object({
    hours: yup.array().of(hourObj),
    additional: yup.array().of(otherObj),
    hoursCount: yup.number(),
    hourWage: yup.number(),
    additionalValue: yup.number(),
    totalToPay: yup.number(),
    closed: yup.boolean()
});

module.exports.getManyRaportsSchema = yup.object({
    skip: yup.number().positive().integer(),
    limit: yup.number().positive().integer(),
    keyword: yup.string(),
    userId: yup.string().min(24).max(24),
    companyId: yup.string().min(24).max(24),
    raportDate: yup.date(),
    closed: yup.boolean(),
    sortBy: yup.string(),
    sortOrder: yup.string().matches('descending','SortOrder accepts only >descending< keyword, use it to reverse sorting')
});