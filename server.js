const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const path = require('path')
require('dotenv').config({ path: './.env' })

const PORT = process.env.PORT || 3001;


app.use(cookieParser())
app.use(express.static("./client/build"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
}

// isProduction &&
//   app.get("*", function (request, response) {
//     response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
//   });

const pollsController = require("./controllers/polls");
const testController = require("./controllers/test")
const usersController = require("./controllers/users")

app.listen(PORT, () => {
    console.log('server started on port', PORT)
})


app.use(express.json());
app.use("/api", testController);
app.use("/api", usersController);
app.use("/api/polls", pollsController);