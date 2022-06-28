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
        const queryResult = await saveNewUser(req.body);
        res.status(201).json({ status: 201, statusText: "Created", data: queryResult.rows });
    } catch (error) {
        console.log(error);
        if (error.code === '23505') {
            res.status(409).json({ status: 409, statusText: "Conflict" });
        } else {
            res.status(500).json({ status: 500, statusText: "Internal Server Error" });
        }
    }
}

module.exports.editUser = async (req, res) => {
    try {
        const queryResult = await editExistingUser(req.body, req.params.id);

        if (queryResult.rowCount > 0) {
            res.status(201).json({ status: 200, statusText: "OK", data: queryResult.rows });
        } else {
            res.status(404).json({ status: 404, statusText: "Resource not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, statusText: "Internal Server Error" });
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const queryResult = await replaceExistingUser(req.body, req.params.id);
        if (queryResult.rowCount > 0) {
            res.status(201).json({ status: 200, statusText: "OK", data: queryResult.rows });
        } else {
            res.status(404).json({ status: 404, statusText: "Resource not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, statusText: "Internal Server Error" });
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const queryResult = await deleteSingleUser(req.params.id);
        if (queryResult.rowCount > 0) {
            res.status(201).json({ status: 200, statusText: "OK", data: queryResult.rows });
        } else {
            res.status(404).json({ status: 404, statusText: "Resource not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, statusText: "Internal Server Error" });
    }
}

module.exports.getOne = async (req, res) => {
    try {
        const queryResult = await getOneUser(req.params.id);
 
        if (queryResult.rowCount > 0) {
            res.status(201).json({ status: 200, statusText: "OK", data: queryResult.rows });
        } else {
            res.status(404).json({ status: 404, statusText: "Resource not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, statusText: "Internal Server Error" });
    }
}

module.exports.getMany = async (req, res) => {
    try {
        const queryResult = await getManyUsers(req.query);

        if (queryResult.rowCount > 0) {
            res.status(201).json({ status: 200, statusText: "OK", data: queryResult.rows });
        } else {
            res.status(404).json({ status: 404, statusText: "Resource not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, statusText: "Internal Server Error" });
    }
}
