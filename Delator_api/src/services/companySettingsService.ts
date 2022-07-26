import { maxResponseCount, filtersDefinition } from '../config/companyRequestConfig';
import { calculateSkipLimit } from '../helpers/skipLimitCalculator';
import { createQueryObject } from '../helpers/queryObjectCreators';
import IDynamicObject from '../interfaces/IDynamicObject';
import CompanySettings from '../models/CompanySettings';
import IParams from '../interfaces/IParams';


const saveNewSettings = async (body?: IDynamicObject) => {
    try {
        const response = await new CompanySettings(body).save();
        return response;
    } catch (error) {
        console.log(error);
    }
};

const editExistingSettings = async (body: IDynamicObject, id: string) => {
    try {
        const response = await CompanySettings.findByIdAndUpdate(id, body, { returnDocument: 'after' });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const deleteSingleSettings = async (id: string) => {
    try {
        const response = await CompanySettings.findByIdAndDelete(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getOneSettings = async (id: string) => {
    try {
        const response = await CompanySettings.findById(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getManySettings = async (params: IParams) => {
    const { skip, limit } = calculateSkipLimit(Number(params.skip), Number(params.limit), maxResponseCount);
    const sortBy = params.sortBy || 'name';
    const sortOrder = params.sortOrder === 'descending' ? '-' : '';
    const queryObject = createQueryObject(CompanySettings, filtersDefinition, params);

    try {
        const response = await CompanySettings.find(queryObject).sort(sortOrder + sortBy).skip(skip).limit(limit);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export {
    saveNewSettings,
    editExistingSettings,
    deleteSingleSettings,
    getOneSettings,
    getManySettings
};
