import { Request, Response } from 'express';
import { saveNewSettings, editExistingSettings, deleteSingleSettings, getOneSettings, getManySettings} from "../services/companySettingsService";


const addSettings = async (req: Request, res: Response) => {
    try {
        const response = await saveNewSettings(req.body);
        res.status(201).json({ data: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const editSettings = async (req: Request, res: Response) => {
    try {
        const response = await editExistingSettings(req.body, req.params.id);
        if (response) {
            res.status(201).json({ data: response });
        } else {
            res.status(404).json({ error: "Resource not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteSettings = async (req: Request, res: Response) => {
    try {
        const response = await deleteSingleSettings(req.params.id);
        if (response) {
            res.status(201).json({ data: response });
        } else {
            res.status(404).json({ error: "Resource not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const getOne = async (req: Request, res: Response) => {
    try {
        const response = await getOneSettings(req.params.id);
        if (response) {
            res.status(201).json({ data: response });
        } else {
            res.status(404).json({ error: "Resource not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getMany = async (req: Request, res: Response) => {
    try {
        const response = await getManySettings(req.query);
        if (!!response && response.length > 0) {
            res.status(201).json({ data: response });
        } else {
            res.status(204).json({ error: "No content" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export {
    addSettings,
    editSettings,
    deleteSettings,
    getOne,
    getMany
}