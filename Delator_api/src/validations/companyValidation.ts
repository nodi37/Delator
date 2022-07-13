import yup from 'yup';

//Part
const adminSchema = yup.object({
    id: yup.string().min(24).max(24).required()
});

const addCompanySchema = yup.object({
    name: yup.string().required(),
    administrators: yup.array().of(adminSchema),
    orgNumber: yup.number().positive().integer(),
    description: yup.string(),
    defHourlyRate: yup.number(),
    defTotalBreakTime: yup.number(),
    stdHrsPerDay: yup.number(),
    overtimeAllowance: yup.number().positive().min(0).max(1),
    freeDaysAllowance: yup.number().positive().min(0).max(1),
    settlementMethod: yup.number().positive().integer().min(1).max(2),
    pricingPlan: yup.number().positive().integer().min(1).max(1).required(),
    logo: yup.string(),
});

const editCompanySchema = yup.object({
    name: yup.string(),
    administrators: yup.array().of(adminSchema),
    orgNumber: yup.number().positive().integer(),
    description: yup.string(),
    defHourlyRate: yup.number(),
    defTotalBreakTime: yup.number(),
    stdHrsPerDay: yup.number(),
    overtimeAllowance: yup.number().positive().min(0).max(1),
    freeDaysAllowance: yup.number().positive().min(0).max(1),
    settlementMethod: yup.number().positive().integer().min(1).max(2),
    pricingPlan: yup.number().positive().integer().min(1).max(1),
    logo: yup.string(),
});

const getManyCompaniesSchema = yup.object({
    skip: yup.number().positive().integer(),
    limit: yup.number().positive().integer(),
    keyword: yup.string(),
    pricingPlan: yup.number().min(0).max(1),
    administrators: yup.string().min(24).max(24),
    sortBy: yup.string(),
    sortOrder: yup.string().matches(new RegExp('descending'), 'SortOrder accepts only >descending< keyword, use it to reverse sorting')
});

export {
    addCompanySchema,
    editCompanySchema,
    getManyCompaniesSchema
}