import express from "express";
const router = express.Router();
import * as contractController from '../controllers/contract.controller';

// const { validateRequestBody, validateRequestParams, validateRequestQuery } from '../middlewares/requestValidationMiddlewares');
// //const { addContractSchema, editContractSchema, getManyContractsSchema } from '../validations/ContractValidation');
// const { idParamSchema } from '../validations/sharedValidations');

// router.post('/', validateRequestBody(addContractSchema), contractController.addContract);
// router.patch('/:id', validateRequestParams(idParamSchema), validateRequestBody(editContractSchema), contractController.editContract); //Updates partial
// router.put('/:id', validateRequestParams(idParamSchema), validateRequestBody(addContractSchema), contractController.updateContract); //Updates entire resource
// router.delete('/:id', validateRequestParams(idParamSchema), contractController.deleteContract);
// router.get('/:id', validateRequestParams(idParamSchema), contractController.getOne);
// router.get('/', validateRequestQuery(getManyContractsSchema), contractController.getMany);

router.post('/', contractController.addContract);
router.patch('/:id', contractController.editContract); //Updates partial
//router.put('/:id', contractController.updateContract); //Updates entire resource
router.delete('/:id', contractController.deleteContract);
router.get('/:id', contractController.getOne);
router.get('/', contractController.getMany);

export default router;
