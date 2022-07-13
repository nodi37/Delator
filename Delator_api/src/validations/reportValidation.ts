import yup from 'yup';

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

const addReportSchema = yup.object({
    userId: yup.string().min(24).max(24).required(),
    companyId: yup.string().min(24).max(24).required(),
    hours: yup.array().of(hourObj),
    additional: yup.array().of(otherObj),
    hoursCount: yup.number(),
    hourWage: yup.number(),
    additionalValue: yup.number(),
    totalToPay: yup.number()
});

const editReportSchema = yup.object({
    hours: yup.array().of(hourObj),
    additional: yup.array().of(otherObj),
    hoursCount: yup.number(),
    hourWage: yup.number(),
    additionalValue: yup.number(),
    totalToPay: yup.number(),
    closed: yup.boolean()
});

const getManyReportsSchema = yup.object({
    skip: yup.number().positive().integer(),
    limit: yup.number().positive().integer(),
    keyword: yup.string(),
    userId: yup.string().min(24).max(24),
    companyId: yup.string().min(24).max(24),
    reportDate: yup.date(),
    closed: yup.boolean(),
    sortBy: yup.string(),
    sortOrder: yup.string().matches(new RegExp('descending'), 'SortOrder accepts only >descending< keyword, use it to reverse sorting')
});

export {
    addReportSchema,
    editReportSchema,
    getManyReportsSchema
}