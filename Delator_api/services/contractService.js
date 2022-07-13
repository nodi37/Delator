const { maxResponseCount } = require('../config/contractRequestConfig');
const { calculateSkipLimit } = require('../helpers/skipLimitCalculator');
const { createQueryObject } = require('../helpers/queryObjectCreators');
const EmploymentContract = require('../models/EmploymentContract');


const saveNewContract = async (body) => {
    try {
        const response = await new EmploymentContract(body).save();
        return response;
    } catch (error) {
        console.log(error);
    }
};

const editExistingContract = async (body, id) => {
    try {
        const response = await EmploymentContract.findByIdAndUpdate(id, body, { returnDocument: 'after' });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const replaceExistingContract = async (body, id) => {
    try {
        const response = await EmploymentContract.findOneAndReplace({ _id: id }, body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const deleteSingleContract = async (id) => {
    try {
        const response = await EmploymentContract.findByIdAndDelete(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getOneContract = async (id) => {
    try {
        const response = await EmploymentContract.findById(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getManyContracts = async (params) => {
    const { skip, limit } = calculateSkipLimit(params.skip, params.limit, maxResponseCount);
    const sortBy = params.sortBy || 'name';
    const sortOrder = params.sortOrder || 'ascending';
    const queryObject = createQueryObject(EmploymentContract, params);

    try {
        const response = await EmploymentContract.find(queryObject).sort([[sortBy, sortOrder]]).skip(skip).limit(limit);
        return response;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    saveNewContract,
    editExistingContract,
    replaceExistingContract,
    deleteSingleContract,
    getOneContract,
    getManyContracts
};
