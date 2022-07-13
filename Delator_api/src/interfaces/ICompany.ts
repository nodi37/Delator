export default interface ICompany {
    pricingPlan: Number;
    employessCount: Number;
    registeredEmployessCount: Number;
    createDate: Date;
    orgNumber: Number;
    companyName: String;
    companyDescription: String;
    administratorsIds: Array<string>;
    logo: String;
    startingHourlyWage: Number;
    settlementMethod: Number;
    overtimeAllowance: Number;
    freeDaysAllowance: Number;
    hoursPerDayCount: Number;
    breakTime: Number;
}
