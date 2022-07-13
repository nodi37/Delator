const {
    saveNewUser,
    editExistingUser,
    replaceExistingUser,
    deleteSingleUser,
    getOneUser,
    getManyUsers
} = require("../services/userService");

module.exports.addUser = async (req, res) => {
    try {
        const response = await saveNewUser(req.body);
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

module.exports.editUser = async (req, res) => {
    try {
        const response = await editExistingUser(req.body, req.params.id);

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

module.exports.updateUser = async (req, res) => {
    try {
        const response = await replaceExistingUser(req.body, req.params.id);
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

module.exports.deleteUser = async (req, res) => {
    try {
        const response = await deleteSingleUser(req.params.id);
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
        const response = await getOneUser(req.params.id);
 
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

module.exports.getMany = async (req, res) => {
    try {
        const response = await getManyUsers(req.query);

        if (response.length>0) {
            res.status(200).json({ data: response });
        } else {
            res.status(204).json({ error: "No content" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
