const { maxResponseCount } = require('../config/userRequestConfig');
const { calculateSkipLimit } = require('../helpers/skipLimitCalculator');
const { createQueryObject, createKeywordSearchArray } = require('../helpers/queryObjectCreators');
const User = require('../models/User');


const saveNewUser = async (body) => {
    try {
        const response = await new User(body).save();
        return response;
    } catch (error) {
        if(!error.code===11000) {
            console.log(error);
        }
        const err = new Error('Duplicate key error!');
        err.code = error.code;
        throw err;
    }
};


const editExistingUser = async (body, id) => {
    try {
        const response = await User.findByIdAndUpdate(id, body, { returnDocument: 'after' });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const replaceExistingUser = async (body, id) => {
    try {
        const response = await User.findOneAndReplace({ _id: id }, body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const deleteSingleUser = async (id) => {
    try {
        const response = await User.findByIdAndDelete(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getOneUser = async (id) => {
    try {
        const response = await User.findById(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getManyUsers = async (params) => {
    const { skip, limit } = calculateSkipLimit(params.skip, params.limit, maxResponseCount);
    const sortBy = params.sortBy || 'name';
    const sortOrder = params.sortOrder || 'ascending';

    // POMYŚLEĆ O STOROWANIU KIEDY JEST TABLICA W ŚRODKU

    //To add new filter just Add entry in validator scheme to let it pass a param and all will be done automatically by this func
    const queryObject = createQueryObject(User, params);

    //Keyword search
    //To add add field to keyword search:
    if (!!params.keyword) {
        //Add here field names with type String
        const stringFieldsArr = [
            'name',
            'lastName',
            'email'
        ];

        //Add here field names with type Number
        const numberFieldsArr = [
            'phoneNumber'
        ];

        queryObject.$or = createKeywordSearchArray(stringFieldsArr, numberFieldsArr, params.keyword);
    }

    try {
        const response = await User.find(queryObject).sort([[sortBy, sortOrder]]).skip(skip).limit(limit);
        return response;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    saveNewUser,
    editExistingUser,
    replaceExistingUser,
    deleteSingleUser,
    getOneUser,
    getManyUsers
};
