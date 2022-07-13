import { maxResponseCount, filtersDefinition } from '../config/companyRequestConfig';
import { calculateSkipLimit } from '../helpers/skipLimitCalculator';
import { createQueryObject } from '../helpers/queryObjectCreators';
import IDynamicObject from '../interfaces/IDynamicObject';
import Company from '../models/Company';
import IParams from '../interfaces/IParams';


const saveNewCompany = async (body: IDynamicObject) => {
    try {
        const response = await new Company(body).save();
        return response;
    } catch (error) {
        console.log(error);
    }
};


const editExistingCompany = async (body: IDynamicObject, id: string) => {
    try {
        const response = await Company.findByIdAndUpdate(id, body, { returnDocument: 'after' });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const replaceExistingCompany = async (body: IDynamicObject, id: string) => {
    try {
        const response = await Company.findOneAndReplace({ _id: id }, body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const deleteSingleCompany = async (id: string) => {
    try {
        const response = await Company.findByIdAndDelete(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getOneCompany = async (id: string) => {
    try {
        const response = await Company.findById(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getManyCompanies = async (params: IParams) => {
    const { skip, limit } = calculateSkipLimit(Number(params.skip), Number(params.limit), maxResponseCount);
    const sortBy = params.sortBy || 'name';
    const sortOrder = params.sortOrder === 'descending'? '-' : '';
    const queryObject = createQueryObject(Company, filtersDefinition, params);

    try {
        const response = await Company.find(queryObject).sort(sortOrder+sortBy).skip(skip).limit(limit);
        return response;
    } catch (error) {
        console.log(error);
    }
}


export{
    saveNewCompany,
    editExistingCompany,
    replaceExistingCompany,
    deleteSingleCompany,
    getOneCompany,
    getManyCompanies
};
