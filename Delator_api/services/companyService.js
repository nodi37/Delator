const { query } = require('express');
const { maxResponseCount } = require('../config/companyRequestConfig');
const { calculateSkipLimit } = require('../helpers/skipLimitCalculator');
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


const deleteSingleCompany = async (id) => {
    try {
        const response = await Company.findByIdAndDelete(id)
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

const getOneCompany = async (id) => {
    try {
        const response = await Company.findById(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getManyCompanies = async (params) => {
    //Automatically creates queryObject based on params and keys and schema
    //To add new filter just Add entry in validator scheme to let it pass a param and all will be done automatically
    const { skip, limit } = calculateSkipLimit(params.skip, params.limit, maxResponseCount);
    const schemaKeys = Object.keys(Company.schema.paths);
    const sortBy = params.sortBy || 'name';
    const sortOrder = params.sortOrder || 'ascending';

    const entries = new Map();

    for (const [key, value] of Object.entries(params)) {
        if (schemaKeys.includes(key)) {
            entries.set(key, value);
        }
    }

    const queryObject = Object.fromEntries(entries) || {};

    //Keyword search
    //To add add field to keyword search:
    if (!!params.keyword) {
        const regex = new RegExp(params.keyword,'i');
        const toSearch = [
            //Add here fields with String type like below:
            //{>fieldName<: regex},
            {name: regex },
            {description: regex},
            {administrators: regex}
        ]

        if(!isNaN(params.keyword)) {
            const kwrdInt = parseInt(params.keyword);
            //Push here new object to toSearch array like below
            //toSearch.push({>fieldName<: kwrdInt});
            toSearch.push({orgNumber: kwrdInt});
        }

        queryObject.$or = toSearch 
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
