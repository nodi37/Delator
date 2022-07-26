import { maxResponseCount, filtersDefinition } from '../config/userSettingsRequestConfig';
import { calculateSkipLimit } from '../helpers/skipLimitCalculator';
import { createQueryObject } from '../helpers/queryObjectCreators';
import UserSettings from '../models/UserSettings';
import IUserSettings from '../interfaces/IUserSettings';
import IQueryError from '../interfaces/IQueryError';
import IParams from '../interfaces/IParams';

import IDynamicObject from '../interfaces/IDynamicObject';

const saveNewUserSettings = async (body: IUserSettings) => {
    try {
        const response = await new UserSettings(body).save();
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

const editExistingUserSettings = async (body: IDynamicObject, id: string) => {
    try {
        const response = await UserSettings.findByIdAndUpdate(id, body, { returnDocument: 'after' });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const replaceExistingUserSettings = async (body: IDynamicObject, id: string) => {
    try {
        const response = await UserSettings.findOneAndReplace({ _id: id }, body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const deleteSingleUserSettings = async (id: string) => {
    try {
        const response = await UserSettings.findByIdAndDelete(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getOneUserSettings = async (id: string) => {
    try {
        const response = await UserSettings.findById(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getManyUserSettings = async (params: IParams) => {
    const { skip, limit } = calculateSkipLimit(Number(params.skip), Number(params.limit), maxResponseCount);
    const sortBy = params.sortBy || 'name';
    const sortOrder = params.sortOrder === 'descending' ? '-' : '';
    const queryObject = createQueryObject(UserSettings, filtersDefinition, params);

    try {
        const response = await UserSettings.find(queryObject).sort(sortOrder + sortBy).skip(skip).limit(limit);
        return response;
    } catch (error) {
        console.log(error);
    }
}


export {
    saveNewUserSettings,
    editExistingUserSettings,
    replaceExistingUserSettings,
    deleteSingleUserSettings,
    getOneUserSettings,
    getManyUserSettings
};
