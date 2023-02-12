const express = require("express");
const mongoose = require("mongoose");
const config = require("../../config.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
config.connectDB();

/**
 * @description :pupolate er maddome akta cullaction er sate onno arek ta cullaction er sate relation toyri kura huy
 * @type : relaton 2 doroner huye take , 1. one to one ,2. one to many
 */

// Create Screma
const todoSchema = mongoose.Schema({
  title: String,
  user: { type: mongoose.Types.ObjectId, ref: "User" },
});

const userSchema = mongoose.Schema({
  name: String,
  age: String,
  todos: [{ type: mongoose.Types.ObjectId, ref: "Todo" }],
});

// Models
const Todo = mongoose.model("Todo", todoSchema);
const User = mongoose.model("User", userSchema);

// Routing
app.post("/todo", async (req, res) => {
  try {
    // One to one and one to

    const todo = await Todo.create({
      title: req.body.title,

      // eykane userId ta jeheto User model er refarence dure rakbe ty obissuy userId ta User modele takte hube
      user: req.body.userId,
    });

    const updateUser = await User.updateOne(
      { _id: req.body.userId },
      {
        $push: {
          todos: todo._id,
        },
      }
    );

    res.status(200).send({ todos: todo });
  } catch (error) {
    res.status(400).send({ message: "Error" });
  }
});

// user
app.post("/user", async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      age: req.body.age,
    });
    res.status(200).send({ message: user });
  } catch (error) {
    res.status(400).send({ message: "Error" });
  }
});

// get todos
// one to one relation result
app.get("/todo", async (req, res) => {
  try {
    const todosWithOutPopulate = await Todo.find();
    const todosWithPopulate = await Todo.find().populate("user");

    // eykane ppupolate mathod er 1 param e kon value data chacci seta sy value ta dite hube,
    // 2 prama e oy id er bitore ta  kon kon data ta dekte cacci seta like deoya jay. exam: "name age"
    // jeta dekte caybona setar samne "-" dile show hube na . Exam: "name age -_id"
    const todosWithCustomaisDataPopulate = await Todo.find().populate(
      "user",
      "name -_id"
    );

    res.status(200).send({
      message: "sucsses",
      data: {
        todosWithOutPopulate: todosWithOutPopulate,
        todosWithPopulate: todosWithPopulate,
        todosWithCustomaisDataPopulate: todosWithCustomaisDataPopulate,
      },
    });
  } catch (error) {
    res.status(400).send({ message: "Error" });
  }
});

// get users
app.get("/user", async (req, res) => {
  try {
    const userWithPopulate = await User.find().populate("todos");
    res.status(200).send({
      message: "sucsses",
      data: { userWithPopulate },
    });
  } catch (error) {
    res.status(400).send({ message: "Error" });
  }
});

module.exports = app;
