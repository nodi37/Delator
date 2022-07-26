import {Request, Response} from 'express';
import IQueryError from "../interfaces/IQueryError";
import {
    saveNewContract,
    editExistingContract,
    replaceExistingContract,
    deleteSingleContract,
    getOneContract,
    getManyContracts
} from "../services/employmentContractService";

const addContract = async (req: Request, res: Response) => {
    try {
        const response = await saveNewContract(req.body);
        res.status(201).json({ data: response });
    } catch (error) {
        const err = error as IQueryError;
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

const editContract = async (req: Request, res: Response) => {
    try {
        const response = await editExistingContract(req.body, req.params.id);

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

const updateContract = async (req: Request, res: Response) => {
    try {
        const response = await replaceExistingContract(req.body, req.params.id);
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

const deleteContract = async (req: Request, res: Response) => {
    try {
        const response = await deleteSingleContract(req.params.id);
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
        const response = await getOneContract(req.params.id);

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
        const response = await getManyContracts(req.query);

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
    addContract,
    editContract,
    updateContract,
    deleteContract,
    getOne,
    getMany
}