const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');

const {validateRequestBody} = require('../middlewares/requestValidationMiddlewares');
const {addUserSchema} = require('../validations/userValidation');



router.post('/', validateRequestBody(addUserSchema), userController.addUser);
router.patch('/:id', userController.editUser); //Updates partial
router.put('/:id', userController.updateUser); //Updates entire resource
router.delete('/:id', userController.deleteUser);
router.get('/:id', userController.getOne);
router.get('/', userController.getMany);

module.exports = router;
