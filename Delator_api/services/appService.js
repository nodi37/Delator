const { pool } = require('../helpers/dbPoolProvider');


const createSystemSchema = async () => {
    const QUERY = `CREATE SCHEMA IF NOT EXISTS system;`;

    try {
        await pool.query(QUERY);
    } catch (error) {
        console.log(error)
    }
}

const createCompaniesTable = async () => {
    const QUERY = `
        CREATE TABLE IF NOT EXISTS system.companies (
        company_id serial PRIMARY KEY, 
        company_name VARCHAR NOT NULL,
        admin_id VARCHAR,
        pricing_plan NUMERIC NOT NULL,
        logo VARCHAR
        );`;

    try {
        await pool.query(QUERY);
    } catch (error) {
        console.log(error)
    }
}

const createUsersTable = async () => {
    const QUERY = `
    CREATE TABLE IF NOT EXISTS system.users (
    user_id serial PRIMARY KEY, 
    company_id VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    phone_number NUMERIC,
    hourly_rate NUMERIC,
    privlege_level NUMERIC NOT NULL,
    photo VARCHAR
    );`;

    try {
        await pool.query(QUERY);
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createSystemSchema,
    createCompaniesTable,
    createUsersTable
}