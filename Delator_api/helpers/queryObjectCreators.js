//////////////////////////////////////////////////// THIS WILL PROBABLY NOT SCALE BUT WORKS FOR NOW //////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////// I NEED TO CHECK THIS LATER  ///////////////////////////////////////////////////////////////

//Creating filters:

// For keyword searching:
//     1. Add entry "keyword" in yup validator.
//     2. Define filters definitions in Model
//     3. Add fields names to arrays. If you want to pass a keyword to field which has number type use 'keywordNumberType' otherwise use 'keywordStringType'.
//         Accepts nested paths too 
//         example:

//         Model.filtersDef = {
//             keywordStringType: [
//                 'fieldName'
//             ],
//             keywordNumberType: [
//                 'fieldName'
//                 'fieldName.nestedFieldName'
//             ]
//         }

//     This is if You want to search for keyword in for example name and phone number which has String and Number types. 
//     Incoming value will be converted to number if its possible and then passed to mongoose find func. 
//     Its required because mongoDB not let to search in fields with number type using strings, value needs to be converted to Number type.


// For other values: 
//     1. Add entry in Yup Validator to let value pass in and it will be done automatically if its simple value, like Number or String. If you want to look for phrase or regexp use keyword query.
//     2. If You need to use nested path you can add it to Model.filtersDef like so:

//     Model.filtersDef = {
//         >employeeOf: 'employeeOf.companyId',<
//         keywordStringType: [
//             'smth'
//         ],
//         keywordNumberType: [
//             'smth'
//         ]
//     }

//     Now if You pass employeeOf as queryParameter, mongoose will look for it in employeeOf.companyId


const { createObjectFromStrings } = require('./objectFromStringsCreator');

const createQueryObject = (mongooseModel, paramsObj) => {

    const entries = new Map();
    const schemaKeys = Object.keys(mongooseModel.schema.paths);
    const { filtersDef } = mongooseModel;

    //Loops throguh paramsObj === req.query
    for (const [key, value] of Object.entries(paramsObj)) {
        //If there is filter definition uses filter definition
        if (filtersDef.hasOwnProperty(key)) {
            const keyDefinition = Object.getOwnPropertyDescriptor(filtersDef, key);
            entries.set(keyDefinition.value, value);
        //If there's not but Model includes field from paramsObj then adds it to query object. 
        //This creates filters automatically and skips fields like skip and limit etc
        } else if (schemaKeys.includes(key)) {
            entries.set(key, value);
        }
    }

    const queryObj = Object.fromEntries(entries);

    //If there is a keyword param then creates entry for keyword search.
    if (!!paramsObj.keyword) {
        queryObj.$or = createKeywordSearchArray(filtersDef.keywordStringType, filtersDef.keywordNumberType, paramsObj.keyword);
    }

    return queryObj;
}



const createKeywordSearchArray = (stringFieldsArr, numberFieldsArr, keyword) => {
    //This func creates an array to assign to "$or" field to object in mongooseModel.find(>object<)
    const toReturn = [];

    //String values creator
    const regex = new RegExp(keyword, 'i');
    stringFieldsArr.forEach(fieldName => toReturn.push(createObjectFromStrings([fieldName], [regex])));

    //Number values creator
    if (!isNaN(keyword)) {
        const kwrdInt = parseFloat(keyword);
        numberFieldsArr.forEach(fieldName => toReturn.push(createObjectFromStrings([fieldName], [kwrdInt])));
    }

    return toReturn;
}


module.exports = { createQueryObject };