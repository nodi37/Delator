import { Request, Response } from 'express';
import { saveNewReport, editExistingReport, replaceExistingReport, deleteSingleReport, getOneReport, getManyReports } from "../services/reportService";


const addReport = async (req: Request, res: Response) => {
    try {
        const response = await saveNewReport(req.body);
        res.status(201).json({ data: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const editReport = async (req: Request, res: Response) => {
    try {
        const response = await editExistingReport(req.body, req.params.id);
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

const updateReport = async (req: Request, res: Response) => {
    try {
        const response = await replaceExistingReport(req.body, req.params.id);
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

const deleteReport = async (req: Request, res: Response) => {
    try {
        const response = await deleteSingleReport(req.params.id);
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
        const response = await getOneReport(req.params.id);
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
        const response = await getManyReports(req.query);
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
    addReport,
    editReport,
    updateReport,
    deleteReport,
    getOne,
    getMany
}