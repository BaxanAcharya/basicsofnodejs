const express = require("express");
const startupDebuger = require("debug")("app:startup");
const dbDebuger = require("debug")("app:db");
const morgan = require("morgan");

const config = require("config");
const courses = require("./routes/courses");
const home = require("./routes/courses");
const log = require("../middleware/logger");
const auth = require("../middleware/auth");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); //default

//Configuration
console.log(`Application name === ${config.get("name")}`);
console.log(`Mail server ==== ${config.get("mail.host")}`);
console.log(`Mail password ==== ${config.get("mail.password")}`);

//export on mac set on windows for setting env variables

//export NODE_ENV=production or set NODE_ENV=production
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebuger("morgan enabled");
}

//bdwork
dbDebuger("connected to  database");

app.use(express.urlencoded({ extended: true })); //key and values
app.use(express.json()); //json raw
app.use(express.static("public")); // serve static content

//example of middle ware
//this get executed every time we request for api hit
app.use(log);
app.use("/api/courses", courses);
app.use("/", home);
app.use(auth);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
