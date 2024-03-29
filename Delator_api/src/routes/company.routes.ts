import express from "express";
const router = express.Router();
import * as companyController from '../controllers/company.controller';

// const { validateRequestBody, validateRequestParams, validateRequestQuery } from '../middlewares/requestValidationMiddlewares');
// const { addCompanySchema, editCompanySchema, getManyCompaniesSchema } from '../validations/companyValidation');
// const { idParamSchema } from '../validations/sharedValidations');

// router.post('/', validateRequestBody(addCompanySchema), companyController.addCompany);
// router.patch('/:id', validateRequestParams(idParamSchema), validateRequestBody(editCompanySchema), companyController.editCompany); //Updates partial
// router.put('/:id', validateRequestParams(idParamSchema), validateRequestBody(addCompanySchema), companyController.updateCompany); //Updates entire resource
// router.delete('/:id', validateRequestParams(idParamSchema), companyController.deleteCompany);
// router.get('/:id', validateRequestParams(idParamSchema), companyController.getOne);
// router.get('/', validateRequestQuery(getManyCompaniesSchema), companyController.getMany);


router.post('/add', companyController.addCompany);
router.patch('/edit/:id', companyController.editCompany); //Updates partial
//router.put('/:id', companyController.updateCompany); //Updates entire resource
router.delete('/delete/:id', companyController.deleteCompany);
router.get('/get/:id', companyController.getOne);
router.get('/get-many', companyController.getMany);

export default router;
