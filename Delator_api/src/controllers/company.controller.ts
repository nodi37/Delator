import { Request, Response } from 'express';
import { saveNewCompany, editExistingCompany, replaceExistingCompany, deleteSingleCompany, getOneCompany, getManyCompanies } from "../services/companyService";


const addCompany = async (req: Request, res: Response) => {
    try {
        const response = await saveNewCompany(req.body);
        res.status(201).json({ data: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const editCompany = async (req: Request, res: Response) => {
    try {
        const response = await editExistingCompany(req.body, req.params.id);
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

const updateCompany = async (req: Request, res: Response) => {
    try {
        const response = await replaceExistingCompany(req.body, req.params.id);
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

const deleteCompany = async (req: Request, res: Response) => {
    try {
        const response = await deleteSingleCompany(req.params.id);
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
        const response = await getOneCompany(req.params.id);
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
        const response = await getManyCompanies(req.query);
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
    addCompany,
    editCompany,
    updateCompany,
    deleteCompany,
    getOne,
    getMany
}