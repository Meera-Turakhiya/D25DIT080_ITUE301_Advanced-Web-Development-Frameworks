const express = require("express");
const router = express.Router();
const tasks = require("../data/tasks");
const validateTaskId = require("../middleware/ValidateTaskid");

// GET 
router.get("/", (req, res) => {
    res.status(200).json(tasks);
});

// POST 
router.post("/", (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// PUT 
router.put("/:id", validateTaskId, (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    task.title = req.body.title;
    task.completed = req.body.completed;

    res.status(200).json(task);
});

//delete
router.delete("/:id", validateTaskId, (req, res) => {
    const id = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    res.status(200).json(deletedTask[0]);
});

module.exports = router;