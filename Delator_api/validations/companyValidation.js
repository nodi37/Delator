const yup = require('yup');

module.exports.addCompanySchema = yup.object({
    name: yup.string().required(),
    administrators: yup.array(),
    description: yup.string(),
    defHourlyRate: yup.number(),
    defTotalBreakTime: yup.number(),
    stdHrsPerDay: yup.number(),
    overtimeAllowance: yup.number().positive().min(0).max(1),
    freeDaysAllowance: yup.number().positive().min(0).max(1),
    settlementMethod: yup.number().positive().integer().min(0).max(1),
    pricingPlan: yup.number().positive().integer().min(0).max(1).required(),
    logo: yup.string(),
});

module.exports.editCompanySchema = yup.object({
    name: yup.string(),
    administrators: yup.array(),
    defHourlyRate: yup.number(),
    defTotalBreakTime: yup.number(),
    stdHrsPerDay: yup.number(),
    overtimeAllowance: yup.number().positive().min(0).max(1),
    freeDaysAllowance: yup.number().positive().min(0).max(1),
    settlementMethod: yup.number().positive().integer().min(0).max(1),
    pricingPlan: yup.number().positive().integer().min(0).max(1),
    logo: yup.string(),
});

module.exports.getManyCompaniesSchema = yup.object({
    skip: yup.number().positive().integer(),
    limit: yup.number().positive().integer(),
    keyword: yup.string(),
    pricingPlan: yup.number().min(0).max(1),
    //description: yup.string(), //<=Uncomment will unlock description filter, its example, add other fields to make them filters
    sortBy: yup.string(),
    sortOrder: yup.string().matches('descending','SortOrder accepts only >descending< keyword, use it to reverse sorting')
});