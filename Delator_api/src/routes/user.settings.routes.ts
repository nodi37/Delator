import express from "express";
const router = express.Router();
import * as userSettingsController from '../controllers/user.settings.controller';

// const { validateRequestBody, validateRequestParams, validateRequestQuery } from '../middlewares/requestValidationMiddlewares');
// const { addUserSchema, editUserSchema, getManyUsersSchema } from '../validations/userValidation');
// const { idParamSchema } from '../validations/sharedValidations');

// router.post('/', validateRequestBody(addUserSchema), userSettingsController.addUser);
// router.patch('/:id', validateRequestParams(idParamSchema), validateRequestBody(editUserSchema), userSettingsController.editUser); //Updates partial
// router.put('/:id', validateRequestParams(idParamSchema), validateRequestBody(addUserSchema), userSettingsController.updateUser); //Updates entire resource
// router.delete('/:id', validateRequestParams(idParamSchema), userSettingsController.deleteUser);
// router.get('/:id', validateRequestParams(idParamSchema), userSettingsController.getOne);
// router.get('/', validateRequestQuery(getManyUsersSchema), userSettingsController.getMany);

router.post('/add', userSettingsController.addUserSettings);
router.patch('/edit/:id', userSettingsController.editUserSettings); //Updates partial
//router.put('/:id', userSettingsController.updateUser); //Updates entire resource
router.delete('/delete/:id', userSettingsController.deleteUserSettings);
router.get('/get/:id', userSettingsController.getOne);
router.get('/get-many', userSettingsController.getMany);


export default router;
