import { maxResponseCount, filtersDefinition } from '../config/userRequestConfig';
import { genRandomPasswordAsHash } from '../utils/password.utils';
import { calculateSkipLimit } from '../helpers/skipLimitCalculator';
import { createQueryObject } from '../helpers/queryObjectCreators';
import User from '../models/User';
import IDynamicObject from "../interfaces/IDynamicObject";
import IQueryError from '../interfaces/IQueryError';
import IParams from '../interfaces/IParams';


const saveNewUser = async (body: IDynamicObject) => {
    try {
        const passwords = await genRandomPasswordAsHash();
        body.password = passwords.passwordHash;

        //Send email with passwords.passwordPlain

        const response = await new User(body).save();
        return response;
    } catch (error) {
        const catchedError = error as IQueryError;
        if (catchedError.code != 11000) {
            console.log(error);
        }
        const err = new Error('Duplicate key error!') as IQueryError;
        err.code = catchedError.code;
        throw err;
    }
};


const editExistingUser = async (body: IDynamicObject, id: string) => {
    try {
        const response = await User.findByIdAndUpdate(id, body, { returnDocument: 'after' });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const replaceExistingUser = async (body: IDynamicObject, id: string) => {
    try {
        const response = await User.findOneAndReplace({ _id: id }, body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const deleteSingleUser = async (id: string) => {
    try {
        const response = await User.findByIdAndDelete(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getOneUser = async (id: string) => {
    try {
        const response = await User.findById(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getManyUsers = async (params: IParams) => {
    const { skip, limit } = calculateSkipLimit(Number(params.skip), Number(params.limit), maxResponseCount);
    const sortBy = params.sortBy || 'name';
    const sortOrder = params.sortOrder === 'descending' ? '-' : '';
    const queryObject = createQueryObject(User, filtersDefinition, params);

    try {
        const response = await User.find(queryObject).sort(sortOrder + sortBy).skip(skip).limit(limit);
        return response;
    } catch (error) {
        console.log(error);
    }
}


export {
    saveNewUser,
    editExistingUser,
    replaceExistingUser,
    deleteSingleUser,
    getOneUser,
    getManyUsers
};
