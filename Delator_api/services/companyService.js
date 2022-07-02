const { maxResponseCount } = require('../config/companyRequestConfig');
const { calculateSkipLimit } = require('../helpers/skipLimitCalculator');
const { createQueryObject, createKeywordSearchArray } = require('../helpers/queryObjectCreators');
const Company = require('../models/Company');


const saveNewCompany = async (body) => {
    try {
        const response = await new Company(body).save();
        return response;
    } catch (error) {
        console.log(error);
    }
};


const editExistingCompany = async (body, id) => {
    try {
        const response = await Company.findByIdAndUpdate(id, body, { returnDocument: 'after' });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const replaceExistingCompany = async (body, id) => {
    try {
        const response = await Company.findOneAndReplace({ _id: id }, body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const deleteSingleCompany = async (id) => {
    try {
        const response = await Company.findByIdAndDelete(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getOneCompany = async (id) => {
    try {
        const response = await Company.findById(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getManyCompanies = async (params) => {
    const { skip, limit } = calculateSkipLimit(params.skip, params.limit, maxResponseCount);
    const sortBy = params.sortBy || 'name';
    const sortOrder = params.sortOrder || 'ascending';

    //To add new filter just Add entry in validator scheme to let it pass a param and all will be done automatically by this func
    const queryObject = createQueryObject(Company, params);

    //Keyword search
    //To add add field to keyword search:
    if (!!params.keyword) {
        //Add here field names with type String
        const stringFieldsArr = [
            'name',
            'description',
            'administrators'
        ];

        //Add here field names with type Number
        const numberFieldsArr = [
            'orgNumber'
        ];

        queryObject.$or = createKeywordSearchArray(stringFieldsArr, numberFieldsArr, params.keyword);
    }

    try {
        const response = await Company.find(queryObject).sort([[sortBy, sortOrder]]).skip(skip).limit(limit);
        return response;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    saveNewCompany,
    editExistingCompany,
    replaceExistingCompany,
    deleteSingleCompany,
    getOneCompany,
    getManyCompanies
};
