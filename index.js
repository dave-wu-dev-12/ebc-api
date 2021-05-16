// load all env vars
require("dotenv").config();

// Bring in the express server and create the app
let express = require("express"); // looks into the node modules to find it
let app = express();

let mongoose = require("mongoose");
// Connect to a new DB, the string can be whatever you want
// your db to be named after the localhost
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB connected…"))
  .catch((err) => console.log(err));

// allow usage of json as req body
app.use(express.json());

let cors = require("cors");
// adding cors without any options to allow everything in
app.use(cors());

// prefix in routes
const routePrefix = "/api";

// get specific routes
const fragranceRouter = require("./routes/fragrances");
app.use(routePrefix + "/fragrances", fragranceRouter);

// spin up the server
var server = app.listen(5000, function () {
  console.log("server is running");
});
