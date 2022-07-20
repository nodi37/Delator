import express from "express";
const router = express.Router();
import * as settingsController from '../controllers/company.settings.controller';

router.post('/add', settingsController.addSettings);
router.patch('/edit/:id', settingsController.editSettings); //Updates partial
router.delete('/delete/:id', settingsController.deleteSettings);
router.get('/get/:id', settingsController.getOne);
router.get('/get-many', settingsController.getMany);

export default router;
