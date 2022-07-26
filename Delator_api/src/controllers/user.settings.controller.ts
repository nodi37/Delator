import { Request, Response } from 'express';
import IQueryError from "../interfaces/IQueryError";
import {
    saveNewUserSettings,
    editExistingUserSettings,
    replaceExistingUserSettings,
    deleteSingleUserSettings,
    getOneUserSettings,
    getManyUserSettings
} from "../services/userSettingsService";
import { encryptPassword } from '../utils/password.utils';

interface IEditReqBody {
    language: string;
    newPassword?: string;
}

const addUserSettings = async (req: Request, res: Response) => {
    try {
        const response = await saveNewUserSettings(req.body);
        res.status(201).json({ data: response });
    } catch (error) {
        const err = error as IQueryError
        if (err.code != 11000) {
            console.log(error);
        }
        if (err.code === 11000) {
            res.status(409).json({ error: "Conflict" });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

const editUserSettings = async (req: Request, res: Response) => {
    try {
        const body = req.body as IEditReqBody;
        let response;

        if (body.newPassword) {
            const passwordHash = await encryptPassword(body.newPassword);
            response = await editExistingUserSettings({ ...body, password: passwordHash }, req.params.id);
        } else {
            response = await editExistingUserSettings({ ...body }, req.params.id);
        }

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

const updateUserSettings = async (req: Request, res: Response) => {
    try {
        const response = await replaceExistingUserSettings(req.body, req.params.id);
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

const deleteUserSettings = async (req: Request, res: Response) => {
    try {
        const response = await deleteSingleUserSettings(req.params.id);
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
        const response = await getOneUserSettings(req.params.id);

        if (response) {
            res.status(200).json({ data: response });
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
        const response = await getManyUserSettings(req.query);

        if (!!response && response.length > 0) {
            res.status(200).json({ data: response });
        } else {
            res.status(204).json({ error: "No content" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export {
    addUserSettings,
    editUserSettings,
    updateUserSettings,
    deleteUserSettings,
    getOne,
    getMany
}