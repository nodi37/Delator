const express = require("express");
const router = express.Router();
const companyController = require('../controllers/company.controller');

const { validateRequestBody, validateRequestParams, validateRequestQuery } = require('../middlewares/requestValidationMiddlewares');
const { addCompanySchema, editCompanySchema, getManyCompaniesSchema } = require('../validations/companyValidation');
const { idParamSchema } = require('../validations/sharedValidations');

router.post('/', validateRequestBody(addCompanySchema), companyController.addCompany);
router.patch('/:id', validateRequestParams(idParamSchema), validateRequestBody(editCompanySchema), companyController.editCompany); //Updates partial
router.put('/:id', validateRequestParams(idParamSchema), validateRequestBody(addCompanySchema), companyController.updateCompany); //Updates entire resource
router.delete('/:id', validateRequestParams(idParamSchema), companyController.deleteCompany);
router.get('/:id', validateRequestParams(idParamSchema), companyController.getOne);
router.get('/', validateRequestQuery(getManyCompaniesSchema), companyController.getMany);

module.exports = router;
