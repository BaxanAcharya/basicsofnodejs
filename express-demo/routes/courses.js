const express = require("express");
const router = express.Router();
const Joi = require("joi");

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id == parseInt(req.params.id));
  if (!course)
    return res.status(404).send(`Course of ${req.params.id} not found`);

  res.send(course);
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
  const course = courses.find((c) => c.id == parseInt(req.params.id));
  if (!course)
    return res.status(404).send(`Course of ${req.params.id} not found`);

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

router.delete("/:id", (req, res) => {
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
module.exports = router;
