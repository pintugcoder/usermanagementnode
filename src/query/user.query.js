
getUserByIdQuery = (schemaName) => {
    return "SELECT * FROM " + schemaName + "." + "users  WHERE user_id=$1"
}

getAllUsersQuery = (schemaName) => {
    return "SELECT * FROM " + schemaName + "." + "users"
}

deleteUserQuery = (schemaName) => {
    return "DELETE FROM  " + schemaName + "." + "users WHERE user_id=$1"
}

updateUserByIdQuery = (schemaName) => {
    return "UPDATE  " + schemaName + "." + "users  SET username = $1, firstname = $2,lastname = $3, password = $4,email = $5 WHERE user_id = $6;";
}

createUserQuery = (schemaName) => {
    return "INSERT INTO " + schemaName + "." + "users (username,firstname,lastname,password,email) VALUES ($1,$2,$3,$4,$5) RETURNING *;"
}

getAllUsersQueryTest = () => {
    return "SELECT * FROM public.users"
}
module.exports = {getAllUsersQueryTest, createUserQuery, getUserByIdQuery, updateUserByIdQuery, getAllUsersQuery, deleteUserQuery };
