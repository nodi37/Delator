import { maxResponseCount, filtersDefinition } from '../config/contractRequestConfig';
import { calculateSkipLimit } from '../helpers/skipLimitCalculator';
import { createQueryObject } from '../helpers/queryObjectCreators';
import IDynamicObject from '../interfaces/IDynamicObject';
import EmploymentContract from '../models/EmploymentContract';
import IParams from '../interfaces/IParams';
import { saveNewUser, getManyUsers } from './userService';
import IUser from '../interfaces/IUser';
import { getOneCompany } from './companyService';
import ICompany from '../interfaces/ICompany';


const saveNewContract = async (body: IDynamicObject) => {
    try {
        const userEmail = body.userEmail as string;
        const companyId = body.companyId as string;
        const userSearchResponse = await getManyUsers({ email: userEmail }) as unknown as [IUser];
        let user = userSearchResponse[0];

        if (!user) {
            const newUserQuery = {
                profile: {
                    email: userEmail,
                },
                settings: {
                    userId: '',
                    superUser: false,
                    language: '',
                    password: ''
                }
            }
            const newUserData = await saveNewUser(newUserQuery) as IUser;
            user = newUserData;
        }

        const company = await getOneCompany(companyId) as unknown as ICompany;

        const newContractBody = {
            ...body,
            userId: user._id!.toString(),
            companyName: company.companyName
        }

        const response = await new EmploymentContract(newContractBody).save();

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
        console.log(response)
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
