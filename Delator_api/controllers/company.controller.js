const { saveNewCompany, editExistingCompany, replaceExistingCompany, deleteSingleCompany, getOneCompany, getManyCompanies } = require("../services/companyService");


module.exports.addCompany = async (req, res) => {
    try {
        const response = await saveNewCompany(req.body);
        res.status(201).json({ data: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports.editCompany = async (req, res) => {
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

module.exports.updateCompany = async (req, res) => {
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

module.exports.deleteCompany = async (req, res) => {
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


module.exports.getOne = async (req, res) => {
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

module.exports.getMany = async (req, res) => {
    try {
        const response = await getManyCompanies(req.query);
        if (response.length>0) {
            res.status(201).json({ data: response });
        } else {
            res.status(204).json({ error: "No content" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
