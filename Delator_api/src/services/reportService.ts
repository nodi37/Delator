import { maxResponseCount, filtersDefinition } from '../config/reportRequestConfig';
import { calculateSkipLimit } from '../helpers/skipLimitCalculator';
import { createQueryObject } from '../helpers/queryObjectCreators';
import IDynamicObject from '../interfaces/IDynamicObject';
import Report from '../models/Report';
import IParams from '../interfaces/IParams';


const saveNewReport = async (body: IDynamicObject) => {
    try {
        const response = await new Report(body).save();
        return response;
    } catch (error) {
        console.log(error);
    }
};


const editExistingReport = async (body: IDynamicObject, id: string) => {
    try {
        const response = await Report.findByIdAndUpdate(id, body, { returnDocument: 'after' });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const replaceExistingReport = async (body: IDynamicObject, id: string) => {
    try {
        const response = await Report.findOneAndReplace({ _id: id }, body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const deleteSingleReport = async (id: string) => {
    try {
        const response = await Report.findByIdAndDelete(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getOneReport = async (id: string) => {
    try {
        const response = await Report.findById(id)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getManyReports = async (params: IParams) => {
    const { skip, limit } = calculateSkipLimit(Number(params.skip), Number(params.limit), maxResponseCount);
    const sortBy = params.sortBy || 'name';
    const sortOrder = params.sortOrder === 'descending'? '-' : '';
    const queryObject = createQueryObject(Report, filtersDefinition, params);

    try {
        const response = await Report.find(queryObject).sort(sortOrder+sortBy).skip(skip).limit(limit);
        return response;
    } catch (error) {
        console.log(error);
    }
}


export {
    saveNewReport,
    editExistingReport,
    replaceExistingReport,
    deleteSingleReport,
    getOneReport,
    getManyReports
};
