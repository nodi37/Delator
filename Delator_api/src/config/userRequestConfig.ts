const maxResponseCount = 20;

//////////////////////
//Define here search paths for filters

const filtersDefinition = {
    //employeeOf: 'employeeOf.companyId',
    keywordStringType: [
        'name',
        'lastName',
        'email',
        'phoneNumber'
    ],
    keywordNumberType: [
        'phoneNumber'
    ]
}

export {
    maxResponseCount,
    filtersDefinition
};