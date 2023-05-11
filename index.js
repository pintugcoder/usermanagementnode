
const db = require("./src/service/user-service")
const express = require("express");
const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

// Create User API 
app.post("/user", db.createUser);
// Get All user API 
app.get("/users", db.getUsers);
// Get User By ID
app.get("/user/:id", db.getUserById);
// Delete user
app.delete("/user/:id", db.deleteUser);
// Update USER
app.put("/user/:id", db.updateUserById);

// app.get("/userstest", db.getUsersTest);
// Server lisening on currently port 3000
app.listen(3000, () => console.log("Listening on port 3000"));

