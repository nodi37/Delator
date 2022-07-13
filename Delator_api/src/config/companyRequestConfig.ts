const maxResponseCount = 10;
const filtersDefinition = {
    //administrators: 'administrators.id',
    keywordStringType: [
        'companyName',
        'companyDescription',
        //'administratorsIds'
    ],
    keywordNumberType: [
        'orgNumber'
    ]
}


export {
    maxResponseCount,
    filtersDefinition
};