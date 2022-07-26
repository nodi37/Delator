export default interface IEmploymentContract {
    userEmail: string,
    userId: string,
    companyId: string,
    companyName: string,
    hourlyWage: number,
    contractType: string,
    employmentDimension: number,
    fromDate: Date,
    toDate: Date,
    permamentContract: boolean,
    archival: boolean,
    signDate: Date,
    lastChangeDate: Date
}