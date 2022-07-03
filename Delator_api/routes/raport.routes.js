const express = require("express");
const router = express.Router();
const raportController = require('../controllers/raport.controller');

const { validateRequestBody, validateRequestParams, validateRequestQuery } = require('../middlewares/requestValidationMiddlewares');
const { addRaportSchema, editRaportSchema, getManyRaportsSchema } = require('../validations/raportValidation');
const { idParamSchema } = require('../validations/sharedValidations');

router.post('/', validateRequestBody(addRaportSchema), raportController.addRaport);
router.patch('/:id', validateRequestParams(idParamSchema), validateRequestBody(editRaportSchema), raportController.editRaport); //Updates partial
router.put('/:id', validateRequestParams(idParamSchema), validateRequestBody(addRaportSchema), raportController.updateRaport); //Updates entire resource
router.delete('/:id', validateRequestParams(idParamSchema), raportController.deleteRaport);
router.get('/:id', validateRequestParams(idParamSchema), raportController.getOne);
router.get('/', validateRequestQuery(getManyRaportsSchema), raportController.getMany);

module.exports = router;
