const { createObjectFromStrings } = require('./objectFromStringsCreator');

const createQueryObject = (mongooseModel, paramsObj) => {
//Automatically creates queryObject based on params object and schema keys
//No value check becausue its checked in request validation

    const entries = new Map();
    const schemaKeys = Object.keys(mongooseModel.schema.paths);

    for (const [key, value] of Object.entries(paramsObj)) {
        if (schemaKeys.includes(key)) {
            entries.set(key, value);
        }
    }

    return Object.fromEntries(entries);
}



const createKeywordSearchArray = (stringFieldsArr, numberFieldsArr, keyword) => {
//Creates an array to assign to "$or" field to object in mongooseModel.find(>object<)
    const toReturn = [];

    //String values creator
    const regex = new RegExp(keyword, 'i');
    stringFieldsArr.forEach(fieldName => toReturn.push(createObjectFromStrings([fieldName], [regex])));

    //Number values creator
    if (!isNaN(keyword)) {
        const kwrdInt = parseInt(keyword);
        numberFieldsArr.forEach(fieldName => toReturn.push(createObjectFromStrings([fieldName], [kwrdInt])));
    }

    return toReturn;
}


module.exports = { createQueryObject, createKeywordSearchArray };