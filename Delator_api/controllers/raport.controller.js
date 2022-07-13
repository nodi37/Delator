const { saveNewRaport, editExistingRaport, replaceExistingRaport, deleteSingleRaport, getOneRaport, getManyRaports } = require("../services/raportService");


module.exports.addRaport = async (req, res) => {
    try {
        const response = await saveNewRaport(req.body);
        res.status(201).json({ data: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports.editRaport = async (req, res) => {
    try {
        const response = await editExistingRaport(req.body, req.params.id);
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

module.exports.updateRaport = async (req, res) => {
    try {
        const response = await replaceExistingRaport(req.body, req.params.id);
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

module.exports.deleteRaport = async (req, res) => {
    try {
        const response = await deleteSingleRaport(req.params.id);
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
        const response = await getOneRaport(req.params.id);
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
        const response = await getManyRaports(req.query);
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
