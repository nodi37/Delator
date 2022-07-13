const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');

const { validateRequestBody, validateRequestParams, validateRequestQuery } = require('../middlewares/requestValidationMiddlewares');
const { addUserSchema, editUserSchema, getManyUsersSchema } = require('../validations/userValidation');
const { idParamSchema } = require('../validations/sharedValidations');

// router.post('/', validateRequestBody(addUserSchema), userController.addUser);
// router.patch('/:id', validateRequestParams(idParamSchema), validateRequestBody(editUserSchema), userController.editUser); //Updates partial
// router.put('/:id', validateRequestParams(idParamSchema), validateRequestBody(addUserSchema), userController.updateUser); //Updates entire resource
// router.delete('/:id', validateRequestParams(idParamSchema), userController.deleteUser);
// router.get('/:id', validateRequestParams(idParamSchema), userController.getOne);
// router.get('/', validateRequestQuery(getManyUsersSchema), userController.getMany);

router.post('/', userController.addUser);
router.patch('/:id', userController.editUser); //Updates partial
//router.put('/:id', userController.updateUser); //Updates entire resource
router.delete('/:id', userController.deleteUser);
router.get('/:id', userController.getOne);
router.get('/', userController.getMany);


module.exports = router;
