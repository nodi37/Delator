const { pool } = require('../helpers/dbPoolProvider');
const { maxResponseCount } = require('../config/companyRequestConfig');
const { createInsertQueryString, createUpdateQueryString, createDeleteQueryString, createSelectQueryString } = require('../helpers/queryStringCreators');

const table = 'system.companies';


const saveNewCompany = async (body) => {
    const query = createInsertQueryString(body, table, true);

    try {
        const added = await pool.query(query);
        return added;
    } catch (error) {
        console.log(error);
    }
};


const editExistingCompany = async (body, id) => {
    const condition = 'company_id = ' + id;
    const query = createUpdateQueryString(body, condition, table, true);

    try {
        const edited = await pool.query(query);
        return edited;
    } catch (error) {
        console.log(error);
    }
}


const deleteSingleCompany = async (id) => {
    const condition = 'company_id = ' + id;
    const query = createDeleteQueryString(condition, table, true);

    try {
        const deleted = await pool.query(query);
        return deleted;
    } catch (error) {
        console.log(error);
    }
}

const replaceExistingCompany = async (body, id) => {
    try {
        const deleted = await deleteSingleCompany(id);
        if (deleted.rowCount > 0) {
            const query = createInsertQueryString({ company_id: id, ...body }, table, true);
            const added = await pool.query(query);
            return added;
        } else {
            return deleted;
        }
    } catch (error) {
        console.log(error);
    }
}

const getOneCompany = async (id) => {
    const condition = 'company_id = ' + id;
    const query = createSelectQueryString(null, table, condition);
    try {
        const found = await pool.query(query);
        return found;
    } catch (error) {
        console.log(error);
    }
}

const getManyCompanies = async (params) => {

    const condition = !!params.keyword ? `company_name ILIKE '%${params.keyword}%'` : null;
    const limitInt = parseInt(params.limit, 10);
    const skipInt = parseInt(params.skip, 10) || 0;
    const limit = (!limitInt || limitInt > maxResponseCount) ? skipInt + maxResponseCount : limitInt;

    const query = createSelectQueryString(null, table, condition, limit, skipInt);

    try {
        const found = await pool.query(query);
        return found;
    } catch (error) {
        console.log(error);
    }

    //DODAC SORTOWANIE/VALIDACJE PARAMETRÓW
}


module.exports = {
    saveNewCompany,
    editExistingCompany,
    replaceExistingCompany,
    deleteSingleCompany,
    getOneCompany,
    getManyCompanies
};
