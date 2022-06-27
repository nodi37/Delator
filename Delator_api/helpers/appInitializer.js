const { createSystemSchema, createCompaniesTable, createUsersTable } = require('../services/appService');

const initApp = async () => {
    await createSystemSchema();
    await createCompaniesTable();
    await createUsersTable();
}

module.exports = {
    initApp
}