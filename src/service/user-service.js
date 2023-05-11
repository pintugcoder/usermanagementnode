// const db = require("../db/db-connection");
// const client = db.client;

const dbconnection = require('spacce-db-lib')
const client = dbconnection
const uq = require('../query/user.query')

// const dbcp = require("../db/db-connection");

// const getUsersTest = (req, res) => {
//     try {
//         const schemaName = req.headers['x-schema-name'];
//         // const client = dbcp.dbcp(schemaName)
//         if(schemaName){
//             client.on('connect',(clientpool) => {
//                 clientpool.query("SET search_path TO  "+schemaName);
//             })
//         }
//         client.query(uq.getAllUsersQueryTest, (err, data) => {
//             if (err)
//                 throw err;

//             res.status(200).json({
//                 err: null,
//                 users: data.rows,
//             });
//         });
//     } catch (error) {
//         res.status(500).json({
//             err: error.message,
//             users: null,
//         });
//     }
// };

const createUser = (req, res) => {
    try {
        console.log("============= Request Body :: " + req.body + "  ===============")
        const { username, firstname, lastname, password, email } = req.body;
        if (req.body == null) {
            throw Error("Send User Detail in request body");
        }
        if (!username && !firstname && !lastname && !password && !email) {
            throw Error("Send User Detail in request body");
        }
        const schemaName = req.headers['x-schema-name'];
        client.query(
            uq.createUserQuery(schemaName),
            [username, firstname, lastname, password, email],
            (err, data) => {
                res.status(201).json({
                    error: null,
                    message: "Created new User " + data,
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Failed to create new User",
        });
    }
};
const getUsers = (req, res) => {
    try {
        const schemaName = req.headers['x-schema-name'];
        client.query(uq.getAllUsersQuery(schemaName), (err, data) => {
            if (err)
                throw err;

            res.status(200).json({
                err: null,
                users: data.rows,
            });
        });
    } catch (error) {
        res.status(500).json({
            err: error.message,
            users: null,
        });
    }
};
const getUserById = (req, res) => {
    try {
        const { id } = req.params;
        const schemaName = req.headers['x-schema-name'];
        client.query(uq.getUserByIdQuery(schemaName), [id], (err, data) => {
            if (err) throw err;
            res.status(200).json({
                err: null,
                user: data.rows[0],
            });
        });
    } catch (error) {
        res.status(500).json({
            err: err.message,
            user: null,
        });
    }
};

const deleteUser = (req, res) => {
    try {
        const { id } = req.params;
        const schemaName = req.headers['x-schema-name'];
        client.query(uq.deleteUserQuery(schemaName), [id], (err, data) => {
            if (err) throw err;
            res.status(200).json({
                error: null,
                message: "User deleted",
            });
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Failed to delete user",
        });
    }
};

const updateUserById = (req, res) => {
    try {
        const { id } = req.params;
        const schemaName = req.headers['x-schema-name'];
        const { username, firstname, lastname, password, email } = req.body;
        client.query(
            uq.updateUserByIdQuery(schemaName),
            [username, firstname, lastname, password, email, id],
            (err, data) => {
                if (err) throw err;

                res.status(201).json({
                    err: null,
                    message: "Updated user successfully",
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            err: error.message,
            message: "Failed to update user",
        });
    }
};

module.exports = {createUser, getUserById, updateUserById, getUsers, deleteUser };