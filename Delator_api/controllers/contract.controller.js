const {
    saveNewContract,
    editExistingContract,
    replaceExistingContract,
    deleteSingleContract,
    getOneContract,
    getManyContracts
} = require("../services/contractService");

module.exports.addContract = async (req, res) => {
    try {
        const response = await saveNewContract(req.body);
        res.status(201).json({ data: response });
    } catch (error) {
        if(error.code!=11000) {
            console.log(error);
        }
        if (error.code === 11000) {
            res.status(409).json({ error: "Conflict" });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports.editContract = async (req, res) => {
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

module.exports.updateContract = async (req, res) => {
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

module.exports.deleteContract = async (req, res) => {
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

module.exports.getOne = async (req, res) => {
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

module.exports.getMany = async (req, res) => {
    try {
        const response = await getManyContracts(req.query);

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
