import express from "express";
const router = express.Router();
import * as settingsController from '../controllers/company.settings.controller';

router.post('/', settingsController.addSettings);
router.patch('/:id', settingsController.editSettings); //Updates partial
router.delete('/:id', settingsController.deleteSettings);
router.get('/:id', settingsController.getOne);
router.get('/', settingsController.getMany);

export default router;
