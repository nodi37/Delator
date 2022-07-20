import express from "express";
const router = express.Router();
import * as reportController from '../controllers/report.controller';

// const { validateRequestBody, validateRequestParams, validateRequestQuery } from '../middlewares/requestValidationMiddlewares');
// const { addReportSchema, editReportSchema, getManyReportsSchema } from '../validations/reportValidation');
// const { idParamSchema } from '../validations/sharedValidations');

// router.post('/', validateRequestBody(addReportSchema), reportController.addReport);
// router.patch('/:id', validateRequestParams(idParamSchema), validateRequestBody(editReportSchema), reportController.editReport); //Updates partial
// router.put('/:id', validateRequestParams(idParamSchema), validateRequestBody(addReportSchema), reportController.updateReport); //Updates entire resource
// router.delete('/:id', validateRequestParams(idParamSchema), reportController.deleteReport);
// router.get('/:id', validateRequestParams(idParamSchema), reportController.getOne);
// router.get('/', validateRequestQuery(getManyReportsSchema), reportController.getMany);

router.post('/add', reportController.addReport);
router.patch('/edit/:id', reportController.editReport); //Updates partial
//router.put('/:id', reportController.updateReport); //Updates entire resource
router.delete('/delete/:id', reportController.deleteReport);
router.get('/get/:id', reportController.getOne);
router.get('/get-many', reportController.getMany);

export default router;
