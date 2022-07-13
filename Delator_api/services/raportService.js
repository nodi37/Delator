const { maxResponseCount } = require('../config/RaportRequestConfig');
const { calculateSkipLimit } = require('../helpers/skipLimitCalculator');
const { createQueryObject } = require('../helpers/queryObjectCreators');
const Raport = require('../models/Report');


const saveNewRaport = async (body) => {
    try {
        const response = await new Raport(body).save();
        return response;
    } catch (error) {
        console.log(error);
    }
};


const editExistingRaport = async (body, id) => {
    try {
        const response = await Raport.findByIdAndUpdate(id, body, { returnDocument: 'after' });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const replaceExistingRaport = async (body, id) => {
    try {
        const response = await Raport.findOneAndReplace({ _id: id }, body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const deleteSingleRaport = async (id) => {
    try {
        const response = await Raport.findByIdAndDelete(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getOneRaport = async (id) => {
    try {
        const response = await Raport.findById(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getManyRaports = async (params) => {
    const { skip, limit } = calculateSkipLimit(params.skip, params.limit, maxResponseCount);
    const sortBy = params.sortBy || 'name';
    const sortOrder = params.sortOrder || 'ascending';
    const queryObject = createQueryObject(Raport, params);

    try {
        const response = await Raport.find(queryObject).sort([[sortBy, sortOrder]]).skip(skip).limit(limit);
        return response;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    saveNewRaport,
    editExistingRaport,
    replaceExistingRaport,
    deleteSingleRaport,
    getOneRaport,
    getManyRaports
};
