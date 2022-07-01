const { maxResponseCount } = require('../config/userRequestConfig');
const { calculateSkipLimit } = require('../helpers/skipLimitCalculator');

const saveNewUser = async (body) => {
    const query = createInsertQueryString(body, table, true);
    try {
        const added = await pool.query(query);
        return added;
    } catch (error) {
        const toThrow = new Error('Query rejected with error code: ' + error.code);
        toThrow.code = error.code;
        throw toThrow;
    }
};

const editExistingUser = async (body, id) => {
    const condition = 'user_id = ' + id;
    const query = createUpdateQueryString(body, condition, table, true);
    try {
        const edited = await pool.query(query);
        return edited;
    } catch (error) {
        console.log(error);
    }
}


const deleteSingleUser = async (id) => {
    const condition = 'user_id = ' + id;
    const query = createDeleteQueryString(condition, table, true);

    try {
        const deleted = await pool.query(query);
        return deleted;
    } catch (error) {
        console.log(error);
    }
}

const replaceExistingUser = async (body, id) => {
    try {
        const deleted = await deleteSingleUser(id);
        if (deleted.rowCount > 0) {
            const query = createInsertQueryString({ user_id: id, ...body }, table, true);
            const added = await pool.query(query);
            return added;
        } else {
            return deleted;
        }
    } catch (error) {
        console.log(error);
    }
}

const getOneUser = async (id) => {
    const condition = 'user_id = ' + id;
    const query = createSelectQueryString('all', table, condition);
    try {
        const found = await pool.query(query);
        return found;
    } catch (error) {
        console.log(error);
    }
}

const getManyUsers = async (params) => {

    //sortOrder 0/1
    //sortBy - column name

    const phoneNumberCondition = !isNaN(params.keyword)?`OR phone_number = ${params.keyword}`:'';

    const condition = !!params.keyword ? 
        `first_name ILIKE '%${params.keyword}%' OR 
         last_name ILIKE '%${params.keyword}%' OR 
         email ILIKE '%${params.keyword}%' 
         ${phoneNumberCondition}` 
        : null;

    const sortOrder = parseInt(params.sortOrder)?'DESC':'ASC';
    const sortBy = !!params.sortBy? `${params.sortBy} ${sortOrder}`:null;
    const {skip, limit} = calculateSkipLimit(params.skip, params.limit, maxResponseCount);
    const query = createSelectQueryString('all', table, condition, sortBy, limit, skip);

    try {
        const found = await pool.query(query);
        return found;
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