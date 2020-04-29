const express = require("express");
const Joi = require("joi");
const log=require('./logger')
const auth=require('./auth')
const app = express();

app.use(express.urlencoded({extended:true})); //key and values 
app.use(express.json()); //json raw
app.use(express.static('public')) // serve static content

//example of middle ware 
//this get executed every time we request for api hit
app.use(log);

app.use(auth)

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" },
];
app.get("/", (req, res) => {
  res.send("hello world!!!!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id == parseInt(req.params.id));
  if (!course)
    return res.status(404).send(`Course of ${req.params.id} not found`);

  res.send(course);
});

app.post("/api/courses", (req, res) => {
  //const result=validateCourse(req.body)
  const { error } = validateCourse(req.body); // ==result.error
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id == parseInt(req.params.id));
  if (!course)
    return res.status(404).send(`Course of ${req.params.id} not found`);

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id == parseInt(req.params.id));
  if (!course)
    return res.status(404).send(`Course of ${req.params.id} not found`);

  const index = courses.indexOf(courses);
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
  const Schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, Schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});