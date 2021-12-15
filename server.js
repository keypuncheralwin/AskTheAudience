const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const PORT = 3001;

app.use(cookieParser())
app.use(express.static("./client/build"));

const pollsController = require("./controllers/polls");
const testController = require("./controllers/test")
const usersController = require("./controllers/users")

app.listen(PORT, () => {
    console.log('server started on port',PORT)
})


app.use(express.json());
app.use("/api", testController);
app.use("/api", usersController);
app.use("/api/polls", pollsController);