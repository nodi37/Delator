const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');

const { validateRequestBody, validateRequestParams, validateRequestQuery } = require('../middlewares/requestValidationMiddlewares');
const { addUserSchema, editUserSchema } = require('../validations/userValidation');
const { idParamSchema } = require('../validations/sharedValidations');

router.post('/', validateRequestBody(addUserSchema), userController.addUser);
router.patch('/:id', validateRequestParams(idParamSchema), validateRequestBody(editUserSchema), userController.editUser); //Updates partial
router.put('/:id', validateRequestParams(idParamSchema), validateRequestBody(addUserSchema), userController.updateUser); //Updates entire resource
router.delete('/:id', validateRequestParams(idParamSchema), userController.deleteUser);
router.get('/:id', validateRequestParams(idParamSchema), userController.getOne);
router.get('/', userController.getMany);

module.exports = router;
