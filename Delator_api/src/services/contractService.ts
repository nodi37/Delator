import { maxResponseCount, filtersDefinition } from '../config/contractRequestConfig';
import { calculateSkipLimit } from '../helpers/skipLimitCalculator';
import { createQueryObject } from '../helpers/queryObjectCreators';
import IDynamicObject from '../interfaces/IDynamicObject';
import EmploymentContract from '../models/EmploymentContract';
import IParams from '../interfaces/IParams';


const saveNewContract = async (body: IDynamicObject) => {
    try {
        const response = await new EmploymentContract(body).save();
        return response;
    } catch (error) {
        console.log(error);
    }
};

const editExistingContract = async (body: IDynamicObject, id: string) => {
    try {
        const response = await EmploymentContract.findByIdAndUpdate(id, body, { returnDocument: 'after' });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const replaceExistingContract = async (body: IDynamicObject, id: string) => {
    try {
        const response = await EmploymentContract.findOneAndReplace({ _id: id }, body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const deleteSingleContract = async (id: string) => {
    try {
        const response = await EmploymentContract.findByIdAndDelete(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getOneContract = async (id: string) => {
    try {
        const response = await EmploymentContract.findById(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getManyContracts = async (params: IParams) => {
    const { skip, limit } = calculateSkipLimit(Number(params.skip), Number(params.limit), maxResponseCount);
    const sortBy = params.sortBy || 'name';
    const sortOrder = params.sortOrder === 'descending' ? '-' : '';
    const queryObject = createQueryObject(EmploymentContract, filtersDefinition, params);

    try {
        const response = await EmploymentContract.find(queryObject).sort(sortOrder + sortBy).skip(skip).limit(limit);
        return response;
    } catch (error) {
        console.log(error);
    }
}


export {
    saveNewContract,
    editExistingContract,
    replaceExistingContract,
    deleteSingleContract,
    getOneContract,
    getManyContracts
};
