export default interface ICompanySettings {
    companyId: string,
    pricingPlan: Number;
    administratorsEmails: Array<string>;
    startingHourlyWage: Number;
    settlementMethod: Number;
    overtimeAllowance: Number;
    freeDaysAllowance: Number;
    hoursPerDayCount: Number;
    breakTime: Number;
}
